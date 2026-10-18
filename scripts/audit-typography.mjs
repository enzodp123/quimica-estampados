import { chromium } from '../.tmp-visual/node_modules/playwright/index.mjs';
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve, extname, sep } from 'node:path';

// Auditar la compilación evita mezclar CSS de HMR con resultados de producción.
const root = resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const server = createServer(async (req, res) => {
  let path = new URL(req.url, 'http://localhost').pathname;
  if (path.endsWith('/')) path += 'index.html';
  const file = resolve(root, '.' + decodeURIComponent(path));
  if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  try { res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream'); res.end(await readFile(file)); }
  catch { res.writeHead(404).end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const base = `http://127.0.0.1:${server.address().port}`;
const out = new URL('../qa-reports/typography/', import.meta.url);
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
await page.route(/google\.com\/maps|maps\.google/, route => route.fulfill({ contentType: 'text/html', body: '' }));
const results = [];
const seen = new Set();
try {
  const paths = (await readdir(resolve(root, 'productos'), { withFileTypes: true })).filter(entry => entry.isDirectory()).map(entry => `/productos/${entry.name}/`);
  const routes = ['/', ...paths, '/404.html'];
  for (const path of routes) {
    for (const width of [320, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + path, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => {
        const small = [], clipped = [], cramped = [], content = [], controls = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while (node = walker.nextNode()) {
          const text = node.textContent.replace(/\s+/g, ' ').trim();
          const el = node.parentElement;
          if (!text || !el || el.closest('script, style, .background-text, .brand-ticker, .visually-hidden, .skip-link, [class$="__rail"], .faq-label > span, .brands__trusted-heading > span') || !el.checkVisibility()) continue;
          const style = getComputedStyle(el), rect = el.getBoundingClientRect();
          if (!rect.width || !rect.height) continue;
          const selector = el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().replace(/\s+/g, '.') : '');
          const size = parseFloat(style.fontSize);
          const item = { selector, text, size, lineHeight: style.lineHeight };
          content.push(item);
          if (size < 12) small.push(item);
          const range = document.createRange(); range.selectNodeContents(node);
          const boxes = [...range.getClientRects()];
          if (boxes.length > 1 && parseFloat(style.lineHeight) < size * 1.1) cramped.push(item);
          // Las diapositivas fuera del área visible se revisan al activarlas, no como recortes de texto.
          const slide = el.closest('[data-product-card], [data-gallery-slide], [data-testimonial-card], .product-gallery__thumb');
          const track = el.closest('[data-product-track], [data-gallery-track], [data-testimonial-carousel], [data-gallery-thumb-track]');
          if (slide && track) {
            const s = slide.getBoundingClientRect(), t = track.getBoundingClientRect();
            if (s.left < t.left - 2 || s.right > t.right + 2 || s.top < t.top - 2 || s.bottom > t.bottom + 2) continue;
          }
          if (el.closest('[data-brand-carousel], .hero-products')) continue;
          let parent = el;
          for (; parent && parent !== document.documentElement; parent = parent.parentElement) {
            const s = getComputedStyle(parent), r = parent.getBoundingClientRect();
            const cx = ['hidden', 'clip', 'auto', 'scroll'].includes(s.overflowX);
            const cy = ['hidden', 'clip', 'auto', 'scroll'].includes(s.overflowY);
            if (boxes.some(b => (cx && (b.right > r.right + 2 || b.left < r.left - 2)) || (cy && (b.bottom > r.bottom + 3 || b.top < r.top - 3)))) {
              clipped.push({ ...item, container: parent.className || parent.tagName }); break;
            }
          }
        }
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        for (const select of document.querySelectorAll('select')) {
          if (!select.checkVisibility()) continue;
          const style = getComputedStyle(select);
          context.font = style.font;
          const available = select.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - (style.appearance === 'none' ? 0 : 20);
          for (const option of select.options) {
            const text = style.textTransform === 'uppercase' ? option.textContent.toUpperCase() : option.textContent;
            const needed = context.measureText(text).width + Math.max(0, text.length - 1) * (parseFloat(style.letterSpacing) || 0);
            if (needed > available + 2) controls.push({ selector: select.name || select.getAttribute('aria-label'), text, available, needed });
          }
        }
        return { small, clipped, cramped, controls, content, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth };
      });
      if (!seen.has(path)) { await writeFile(new URL(`text-${path.replaceAll('/', '_') || 'home'}.json`, out), JSON.stringify(result.content, null, 2)); seen.add(path); }
      results.push({ path, width, ...result, content: undefined });
      if (path === '/') {
        const selectors = width === 390 ? ['.contact__form', '.faq-content'] : width === 1024 ? ['.services', '.work-gallery__filters--responsive'] : width === 1440 ? ['.hero'] : [];
        for (const selector of selectors) {
          const target = page.locator(selector);
          await target.scrollIntoViewIfNeeded();
          await page.waitForTimeout(200);
          await target.screenshot({ path: resolve('qa-reports/typography', `${selector.slice(1)}-${width}.png`) });
        }
      }
      if (path === '/404.html' && width === 320) await page.locator('.not-found').screenshot({ path: resolve('qa-reports/typography/404-320.png') });
    }
  }
  await writeFile(new URL('audit.json', out), JSON.stringify(results, null, 2));
  const failures = results.filter(r => r.small.length || r.clipped.length || r.cramped.length || r.controls.length || r.scrollWidth > r.clientWidth);
  console.log(JSON.stringify({ routes: routes.length, layouts: results.length, passed: results.length - failures.length, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally { await browser.close(); await new Promise(done => server.close(done)); }
