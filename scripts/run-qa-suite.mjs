import { chromium } from '../.tmp-visual/node_modules/playwright/index.mjs';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

const root = resolve('dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer(async (req, res) => {
  let reqPath = new URL(req.url, 'http://localhost').pathname;
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  const filePath = resolve(root, '.' + reqPath);
  if (!filePath.startsWith(root)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
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

const screenshotsDir = resolve('qa-reports/screenshots');
await mkdir(screenshotsDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

const report = {
  timestamp: new Date().toISOString(),
  baseUrl,
  testSummary: { total: 0, passed: 0, failed: 0 },
  tests: [],
  overflowAudit: [],
  consoleErrors: [],
};

function recordTest(name, passed, details = null) {
  report.testSummary.total++;
  if (passed) report.testSummary.passed++;
  else report.testSummary.failed++;
  report.tests.push({ name, passed, details });
  const icon = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${icon}: ${name}${details ? ` (${JSON.stringify(details)})` : ''}`);
}

try {
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('pageerror', (err) => {
    report.consoleErrors.push({ type: 'pageerror', message: err.message, stack: err.stack });
    console.error('Page error detected:', err.message);
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      report.consoleErrors.push({ type: 'console.error', text: msg.text() });
    }
  });

  console.log('\n--- 1. AUDITORÍA RESPONSIVE Y DESBORDAMIENTO HORIZONTAL ---');
  const viewports = [
    { name: 'Mobile Mini', width: 320, height: 640 },
    { name: 'Mobile Standard (iPhone/Pixel)', width: 390, height: 844 },
    { name: 'Tablet Portrait (iPad Mini/Air)', width: 768, height: 1024 },
    { name: 'Tablet Landscape / Laptop', width: 1024, height: 768 },
    { name: 'Desktop Standard (HD)', width: 1280, height: 800 },
    { name: 'Desktop Large (FullHD/Mac)', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    try {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      const overflowElements = await page.evaluate((width) => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const culprits = [];
        if (scrollWidth > docWidth) {
          document.querySelectorAll('*').forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 1) {
              culprits.push({
                tag: el.tagName,
                className: el.className ? String(el.className).slice(0, 50) : '',
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              });
            }
          });
        }
        return { scrollWidth, docWidth, culprits: culprits.slice(0, 5) };
      }, vp.width);

      const hasOverflow = overflowElements.scrollWidth > overflowElements.docWidth;
      report.overflowAudit.push({ viewport: vp.name, width: vp.width, hasOverflow, ...overflowElements });
      recordTest(`Sin scroll horizontal en ${vp.name} (${vp.width}px)`, !hasOverflow, hasOverflow ? overflowElements : null);
    } catch (err) {
      recordTest(`Sin scroll horizontal en ${vp.name} (${vp.width}px)`, false, { error: err.message });
    }
  }

  console.log('\n--- 2. PRUEBAS FUNCIONALES EN HOME (DESKTOP & MOBILE) ---');

  // Test 2.1: Navegación por anclas en Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });

  const navLinks = ['#inicio', '#trabajos', '#nosotros', '#contacto'];
  for (const anchor of navLinks) {
    try {
      const link = page.locator(`.main-nav a[href="/${anchor}"]`).first();
      const count = await link.count();
      if (count > 0) {
        await link.click();
        await page.waitForTimeout(300);
        const targetInView = await page.locator(anchor).isVisible();
        recordTest(`Navegación Header: enlace directo hacia ${anchor}`, targetInView);
      } else {
        recordTest(`Navegación Header: enlace directo hacia ${anchor}`, false, { error: 'Not found' });
      }
    } catch (err) {
      recordTest(`Navegación Header: enlace directo hacia ${anchor}`, false, { error: err.message });
    }
  }

  // Enlace a servicios en Footer
  try {
    const footerServicesLink = page.locator('.footer a[href="/#servicios"]').first();
    await footerServicesLink.scrollIntoViewIfNeeded();
    await footerServicesLink.click();
    await page.waitForTimeout(300);
    const servicesVisible = await page.locator('#servicios').isVisible();
    recordTest('Navegación Footer: enlace hacia sección #servicios', servicesVisible);
  } catch (err) {
    recordTest('Navegación Footer: enlace hacia sección #servicios', false, { error: err.message });
  }

  // Menú desplegable Servicios en Desktop Header
  try {
    const servicesTriggerDesktop = page.locator('.nav-item--services .nav-menu__trigger');
    await servicesTriggerDesktop.click();
    await page.waitForTimeout(200);
    const isDesktopMenuOpen = await servicesTriggerDesktop.getAttribute('aria-expanded') === 'true';
    recordTest('Header Desktop: Botón Servicios despliega menú de categorías', isDesktopMenuOpen);
  } catch (err) {
    recordTest('Header Desktop: Botón Servicios despliega menú de categorías', false, { error: err.message });
  }

  // Test 2.2: Menú Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });

  try {
    const menuToggle = page.locator('.menu-toggle');
    await menuToggle.click();
    await page.waitForTimeout(250);
    const isMenuExpanded = await menuToggle.getAttribute('aria-expanded') === 'true';
    recordTest('Mobile: Apertura de menú móvil (botón hamburguesa)', isMenuExpanded);

    const servicesTrigger = page.locator('.nav-menu__trigger');
    if (await servicesTrigger.isVisible()) {
      await servicesTrigger.click();
      await page.waitForTimeout(200);
      const servicesExpanded = await servicesTrigger.getAttribute('aria-expanded') === 'true';
      recordTest('Mobile: Despliegue de submenú Servicios dentro del menú móvil', servicesExpanded);
    }

    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    const isMenuClosed = await menuToggle.getAttribute('aria-expanded') === 'false';
    recordTest('Mobile: Cierre accesible de menú móvil con tecla Escape', isMenuClosed);
  } catch (err) {
    recordTest('Mobile: Menú interactivo', false, { error: err.message });
  }

  // Test 2.3: Carrusel de Productos Destacados ("Impresiones" / ProductShowcase)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });

  try {
    const productCarousel = page.locator('[data-product-carousel]');
    await productCarousel.scrollIntoViewIfNeeded();

    const track = productCarousel.locator('[data-product-track]');
    const nextBtn = productCarousel.locator('[data-carousel-next]');
    const prevBtn = productCarousel.locator('[data-carousel-previous]');

    await nextBtn.waitFor({ state: 'visible', timeout: 5000 });

    const initialScroll = await track.evaluate((el) => el.scrollLeft);
    await nextBtn.click();
    await page.waitForTimeout(500);
    const scrollAfterNext = await track.evaluate((el) => el.scrollLeft);
    recordTest('Carrusel de productos: Flecha siguiente avanza posición', scrollAfterNext > initialScroll, {
      before: initialScroll,
      after: scrollAfterNext,
    });

    await prevBtn.click();
    await page.waitForTimeout(500);
    const scrollAfterPrev = await track.evaluate((el) => el.scrollLeft);
    recordTest('Carrusel de productos: Flecha anterior retrocede posición', scrollAfterPrev < scrollAfterNext, {
      before: scrollAfterNext,
      after: scrollAfterPrev,
    });

    await track.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    const scrollAfterKey = await track.evaluate((el) => el.scrollLeft);
    recordTest('Carrusel de productos: Navegación accesible con teclado (ArrowRight)', scrollAfterKey > scrollAfterPrev);
  } catch (err) {
    recordTest('Carrusel de productos destacados: Interacción de controles y teclado', false, { error: err.message });
  }

  // Test 2.4: Marquee de Marcas (BrandCarousel)
  try {
    const brandCarousel = page.locator('[data-brand-carousel]');
    await brandCarousel.scrollIntoViewIfNeeded();
    const brandItems = brandCarousel.locator('.brand-carousel__item');
    const brandCount = await brandItems.count();
    recordTest('Carrusel de Marcas: Renderiza logos de clientes', brandCount >= 6, { count: brandCount });
  } catch (err) {
    recordTest('Carrusel de Marcas: Renderizado', false, { error: err.message });
  }

  // Test 2.5: Filtros de la Galería de Trabajos ("Nuestros Trabajos")
  try {
    const workSection = page.locator('#trabajos');
    await workSection.scrollIntoViewIfNeeded();

    const categories = ['calcos', 'papeleria', 'gran-formato', 'corporeos', 'textil'];
    let filterSuccess = true;
    for (const cat of categories) {
      const filterBtn = page.locator(`[data-work-filter="${cat}"]:visible`).first();
      if (await filterBtn.count() > 0) {
        await filterBtn.click();
        await page.waitForTimeout(200);
        const isFilterActive = await filterBtn.evaluate((el) => el.classList.contains('is-active'));
        const panelVisible = await page.locator(`[data-work-panel="${cat}"]`).isVisible();
        if (!isFilterActive || !panelVisible) filterSuccess = false;
      }
    }
    recordTest('Galería de trabajos: Filtros de categoría interactivos (Textil, Calcos, Papelería, etc.)', filterSuccess);

    // Lightbox modal
    const firstWorkImage = page.locator('[data-work-image]:visible').first();
    await firstWorkImage.click();
    await page.waitForTimeout(300);
    const lightbox = page.locator('[data-work-lightbox]');
    const isLightboxOpen = await lightbox.evaluate((dialog) => dialog.open);
    recordTest('Galería de trabajos: Apertura de Lightbox al clickear imagen', isLightboxOpen);

    await page.screenshot({ path: resolve(screenshotsDir, 'work-gallery-lightbox.png') });

    const lightboxClose = page.locator('[data-work-lightbox-close]');
    await lightboxClose.click();
    await page.waitForTimeout(200);
    const isLightboxClosed = await lightbox.evaluate((dialog) => !dialog.open);
    recordTest('Galería de trabajos: Cierre de Lightbox con botón de cerrar', isLightboxClosed);
  } catch (err) {
    recordTest('Galería de trabajos y Lightbox', false, { error: err.message });
  }

  // Test 2.6: Preguntas Frecuentes (FAQ)
  try {
    const faqSection = page.locator('#preguntas');
    await faqSection.scrollIntoViewIfNeeded();

    const faqTabs = page.locator('[data-faq-tab]');
    const faqCount = await faqTabs.count();
    recordTest('Sección FAQ cuenta con preguntas configuradas', faqCount >= 6, { count: faqCount });

    if (faqCount >= 2) {
      const firstTab = faqTabs.nth(0);
      const tabText = (await firstTab.textContent()).trim();
      await firstTab.click();
      await page.waitForTimeout(250);

      const questionInPanel = await page.locator('#faq-answer-panel .faq-card__question').textContent();
      const isAnswerUpdated = questionInPanel.trim() === tabText;
      recordTest('FAQ: Cambio de pregunta y respuesta sincronizada al clickear tab', isAnswerUpdated, {
        selected: tabText,
        panelQuestion: questionInPanel.trim(),
      });

      await page.screenshot({ path: resolve(screenshotsDir, 'faq-expanded.png') });
    }
  } catch (err) {
    recordTest('Sección FAQ interactiva', false, { error: err.message });
  }

  // Test 2.7: Formulario de Contacto
  try {
    const contactSection = page.locator('#contacto');
    await contactSection.scrollIntoViewIfNeeded();

    const contactForm = page.locator('[data-contact-form]');
    const submitButton = contactForm.locator('button[type="submit"]');

    const isFormValidInitially = await contactForm.evaluate((form) => form.checkValidity());
    recordTest('Formulario de contacto: Bloqueo de envío cuando campos requeridos están vacíos', !isFormValidInitially);

    await contactForm.locator('input[name="name"]').fill('Enzo Tester QA');
    await contactForm.locator('input[name="email"]').fill('enzo.test@ejemplo.com');
    await contactForm.locator('textarea[name="message"]').fill('Consulta de prueba automatizada de testing funcional y visual.');

    const isFormValidAfterFill = await contactForm.evaluate((form) => form.checkValidity());
    recordTest('Formulario de contacto: Validación correcta con datos válidos completados', isFormValidAfterFill);

    await page.evaluate(() => {
      window.open = (url) => { window.__lastOpenedUrl = url; return { closed: false }; };
    });

    await submitButton.click();
    await page.waitForTimeout(500);

    const statusText = await contactForm.locator('[data-contact-status]').textContent();
    const redirectedUrl = await page.evaluate(() => window.__lastOpenedUrl || '');
    const formSuccess = statusText.includes('WhatsApp') || statusText.includes('¡Listo!') || redirectedUrl.includes('wa.me');
    recordTest('Formulario de contacto: Procesamiento de envío y preparación hacia WhatsApp', formSuccess, {
      statusText,
      redirectedUrl: redirectedUrl.slice(0, 60),
    });

    await page.screenshot({ path: resolve(screenshotsDir, 'contact-section.png') });
  } catch (err) {
    recordTest('Formulario de contacto: Flujo de validación y envío', false, { error: err.message });
  }

  // Test 2.8: Botón Volver Arriba y Floating WhatsApp
  try {
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await page.waitForTimeout(300);

    const backToTopBtn = page.locator('[data-back-to-top]');
    await backToTopBtn.click();
    await page.waitForFunction(() => window.scrollY === 0, { timeout: 6000 });
    const scrollYAfterTop = await page.evaluate(() => window.scrollY);
    recordTest('Botón "Volver arriba": Desplaza la pantalla a la cima (Y=0)', scrollYAfterTop === 0, {
      finalScrollY: scrollYAfterTop,
    });

    const floatingWhatsApp = page.locator('.floating-actions a[href*="wa.me"]');
    const waHref = await floatingWhatsApp.getAttribute('href');
    const isWaValid = /^https:\/\/wa\.me\/\d+/.test(waHref);
    recordTest('Botón flotante de WhatsApp: Enlace válido con número internacional', isWaValid, { href: waHref });
  } catch (err) {
    recordTest('Botones flotantes (Volver arriba y WhatsApp)', false, { error: err.message });
  }

  console.log('\n--- 3. PRUEBAS FUNCIONALES EN FICHA DE PRODUCTO ---');
  try {
    await page.goto(baseUrl + '/productos/buzo-cuello-redondo/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const priceDisplay = page.locator('[data-product-price]').first();
    const initialPrice = await priceDisplay.textContent();

    // Buzo inicia en pack x5 ($152.500). Seleccionamos pack x1 (primer botón) para ver el cambio a $32.000
    const quantityButtons = page.locator('[data-price-dimension="quantity"] [data-price-choice]');
    const quantityCount = await quantityButtons.count();
    if (quantityCount >= 2) {
      const firstQuantity = quantityButtons.nth(0); // x1
      await firstQuantity.click();
      await page.waitForTimeout(300);

      const updatedPrice = await priceDisplay.textContent();
      recordTest('Ficha de producto: Actualización dinámica de precio al seleccionar pack/cantidad', updatedPrice !== initialPrice, {
        initialPrice,
        updatedPrice,
      });

      const quoteButton = page.locator('[data-price-contact]').first();
      const quoteHref = await quoteButton.getAttribute('href');
      const quoteUrl = new URL(quoteHref);
      const messageParam = quoteUrl.searchParams.get('text') || '';
      const hasPriceInWhatsApp = messageParam.includes(updatedPrice.trim());
      recordTest('Ficha de producto: El botón de consulta de WhatsApp actualiza el mensaje con el precio y variante activa', hasPriceInWhatsApp, {
        messagePreview: messageParam.slice(0, 80),
      });
    }

    // Galería de miniaturas
    const thumbs = page.locator('[data-gallery-thumb]');
    const thumbCount = await thumbs.count();
    if (thumbCount >= 2) {
      const mainImg = page.locator('img[data-gallery-main]');
      const initialSrc = await mainImg.getAttribute('src');

      await thumbs.nth(1).click();
      await page.waitForTimeout(250);

      const newSrc = await mainImg.getAttribute('src');
      recordTest('Ficha de producto: Click en miniatura cambia la imagen principal', newSrc !== initialSrc, {
        initialSrc: initialSrc?.slice(0, 40),
        newSrc: newSrc?.slice(0, 40),
      });
    }

    // Recomendaciones
    const relatedCards = page.locator('.related [data-product-card]');
    const relatedSlugs = await relatedCards.evaluateAll((cards) => cards.map((c) => c.dataset.productCard));
    const excludesCurrent = !relatedSlugs.includes('buzo-cuello-redondo');
    recordTest('Ficha de producto: Carrusel de relacionados excluye el producto actual', excludesCurrent && relatedSlugs.length > 0, {
      relatedCount: relatedSlugs.length,
      excludesSelf: excludesCurrent,
    });
  } catch (err) {
    recordTest('Ficha de producto: Interacciones de compra y variantes', false, { error: err.message });
  }

  console.log('\n--- 4. PRUEBA DE PÁGINA 404 ---');
  try {
    await page.goto(baseUrl + '/404.html', { waitUntil: 'networkidle' });
    const notFoundContainer = page.locator('.not-found');
    const content = await notFoundContainer.textContent();
    const has404Text = content.includes('404') && content.includes('no está estampada');
    const returnHomeLink = page.locator('.not-found a[href="/"]');
    const hasReturnLink = await returnHomeLink.count() > 0;
    recordTest('Página 404: Muestra mensaje 404 y botón de retorno al Home', has404Text && hasReturnLink);
  } catch (err) {
    recordTest('Página 404: Renderizado y enlace de retorno', false, { error: err.message });
  }

  console.log('\n--- 5. CAPTURA DE SCREENSHOTS VISUALES ---');
  try {
    // Home Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: resolve(screenshotsDir, 'home-desktop-1440.png'), fullPage: true });

    // Home Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: resolve(screenshotsDir, 'home-tablet-768.png'), fullPage: true });

    // Home Mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: resolve(screenshotsDir, 'home-mobile-390.png'), fullPage: true });

    // Product Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(baseUrl + '/productos/buzo-cuello-redondo/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: resolve(screenshotsDir, 'product-desktop-1440.png'), fullPage: true });

    // Product Mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseUrl + '/productos/buzo-cuello-redondo/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: resolve(screenshotsDir, 'product-mobile-390.png'), fullPage: true });

    // 404 Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(baseUrl + '/404.html', { waitUntil: 'networkidle' });
    await page.screenshot({ path: resolve(screenshotsDir, 'page-404-desktop.png') });

    recordTest('Generación de capturas de pantalla de alta resolución (Desktop, Tablet, Mobile, Ficha, 404)', true, {
      screenshotsGenerated: [
        'home-desktop-1440.png',
        'home-tablet-768.png',
        'home-mobile-390.png',
        'product-desktop-1440.png',
        'product-mobile-390.png',
        'page-404-desktop.png',
        'work-gallery-lightbox.png',
        'faq-expanded.png',
        'contact-section.png',
      ],
    });
  } catch (err) {
    recordTest('Captura de screenshots visuales', false, { error: err.message });
  }

  // Test 6: Verificación de errores de consola
  recordTest('Cero errores no controlados de JavaScript en consola', report.consoleErrors.length === 0, {
    errors: report.consoleErrors,
  });

  await context.close();
} finally {
  await browser.close();
  server.close();
}

await writeFile(resolve('qa-reports/report.json'), JSON.stringify(report, null, 2), 'utf-8');

console.log('\n========================================');
console.log(`RESUMEN FINAL DE QA:`);
console.log(`Total pruebas: ${report.testSummary.total}`);
console.log(`Aprobadas: ${report.testSummary.passed}`);
console.log(`Fallidas: ${report.testSummary.failed}`);
console.log(`Errores de consola: ${report.consoleErrors.length}`);
console.log(`Reporte guardado en: qa-reports/report.json`);
console.log(`Capturas guardadas en: qa-reports/screenshots/`);
console.log('========================================\n');

if (report.testSummary.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
