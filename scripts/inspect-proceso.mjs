import { chromium } from '../.tmp-visual/node_modules/playwright/index.mjs';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

const root = resolve('dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
};

const server = createServer(async (req, res) => {
  let reqPath = new URL(req.url, 'http://localhost').pathname;
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  const filePath = resolve(root, '.' + reqPath);
  try {
    const data = await readFile(filePath);
    res.setHeader('Content-Type', mime[extname(filePath)] || 'application/octet-stream');
    res.end(data);
  } catch {
    res.writeHead(404).end('Not Found');
  }
});

await new Promise((done) => server.listen(0, '127.0.0.1', done));
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}`;

await mkdir('qa-reports/gap-audit', { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

const page = await browser.newPage();

for (const width of [1440, 1280, 1100, 1024, 960, 896, 768]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const sec = page.locator('#proceso');
  await sec.scrollIntoViewIfNeeded();

  const metrics = await page.evaluate(() => {
    const section = document.querySelector('#proceso');
    const stage = section.querySelector('.industrial__stage');
    const imgWrap = section.querySelector('.industrial__image-wrap');
    const img = section.querySelector('.industrial__image');
    const list = section.querySelector('.process-list');
    const rail = section.querySelector('.industrial__rail');
    const title = section.querySelector('.industrial__title');

    const sRect = section.getBoundingClientRect();
    const imgRect = imgWrap.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();

    return {
      sectionHeight: Math.round(sRect.height),
      stageGap: window.getComputedStyle(stage).gap,
      stageTemplate: window.getComputedStyle(stage).gridTemplateColumns,
      imgTop: Math.round(imgRect.top - sRect.top),
      imgBottom: Math.round(imgRect.bottom - sRect.top),
      imgHeight: Math.round(imgRect.height),
      imgWidth: Math.round(imgRect.width),
      listTop: Math.round(listRect.top - sRect.top),
      listBottom: Math.round(listRect.bottom - sRect.top),
      listHeight: Math.round(listRect.height),
      gapBetweenImgAndList: Math.round(listRect.left - imgRect.right),
      emptySpaceBelowImg: Math.round(sRect.bottom - imgRect.bottom),
      emptySpaceBelowList: Math.round(sRect.bottom - listRect.bottom),
      titleBottom: Math.round(sRect.bottom - titleRect.bottom),
    };
  });

  console.log(`\nWidth: ${width}px:`, JSON.stringify(metrics, null, 2));

  await sec.screenshot({ path: `qa-reports/gap-audit/proceso-${width}.png` });
}

await browser.close();
server.close();

