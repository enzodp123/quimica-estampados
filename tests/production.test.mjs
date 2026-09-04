import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import test from "node:test";

const projectRoot = resolve(".");
const distRoot = resolve(projectRoot, "dist");

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});

const files = walk(distRoot);
const htmlFiles = files.filter((path) => extname(path) === ".html");
const pages = htmlFiles.map((path) => ({ path, html: readFileSync(path, "utf8") }));
const documentPages = pages.filter(({ path }) => !path.endsWith(`${sep}404.html`));

const routeFor = (path) => {
  const outputPath = relative(distRoot, path).split(sep).join("/");
  if (outputPath === "index.html") return "/";
  if (outputPath.endsWith("/index.html")) return `/${outputPath.slice(0, -"index.html".length)}`;
  return `/${outputPath}`;
};

const routeMap = new Map(pages.map((page) => [routeFor(page.path), page]));

const extract = (html, pattern) => [...html.matchAll(pattern)].map((match) => match[1]);

test("genera el home, 17 productos y una página 404", () => {
  assert.equal(documentPages.length, 18);
  assert.ok(routeMap.has("/"));
  assert.ok(routeMap.has("/404.html"));
  assert.equal([...routeMap.keys()].filter((route) => route.startsWith("/productos/")).length, 17);
});

test("cada documento tiene metadatos y landmarks básicos", () => {
  for (const { path, html } of pages) {
    assert.match(html, /<html\s[^>]*lang="es"/i, path);
    assert.match(html, /<meta\s[^>]*name="description"[^>]*content="[^"]+"/i, path);
    assert.match(html, /<meta\s[^>]*property="og:title"/i, path);
    assert.match(html, /<link\s[^>]*rel="icon"/i, path);
    assert.equal((html.match(/<main\b/gi) ?? []).length, 1, path);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, path);
    assert.match(html, /class="skip-link"\s+href="#main-content"/i, path);
    assert.doesNotMatch(html, /href="#"|action="#"/i, path);
    assert.doesNotMatch(html, /Ã.|Â.|â€|�/, path);
  }
});

test("los títulos de las páginas indexables son únicos", () => {
  const titles = documentPages.map(({ html }) => extract(html, /<title>([^<]+)<\/title>/gi)[0]);
  assert.equal(new Set(titles).size, titles.length);
});

test("el home conserva todas las secciones y contenidos clave del diseño", () => {
  const home = routeMap.get("/")?.html ?? "";
  const sectionIds = [
    "inicio", "impresiones", "servicios", "proceso", "trabajos",
    "nosotros", "contacto", "marcas", "preguntas",
  ];
  const designCopy = [
    "Cada detalle cuenta",
    "Otra Cultura",
    "Veterinaria Pocas Pulgas",
    "Lucia Novello",
    "¿Listo para ser la próxima marca?",
    "Resolvemos tus dudas",
  ];

  for (const id of sectionIds) assert.match(home, new RegExp(`\\bid="${id}"`), id);
  for (const copy of designCopy) assert.ok(home.includes(copy), copy);
});

test("los listados de productos no muestran círculos de paginación", () => {
  const output = pages.map(({ html }) => html).join("\n");
  const home = routeMap.get("/")?.html ?? "";

  assert.doesNotMatch(output, /product-showcase__pagination|related__pagination/);
  assert.doesNotMatch(output, /data-product-dot|data-related-dot/);
  assert.doesNotMatch(home, /class="product-card is-active"/);
});

test("las secciones usan layouts seguros entre tablet y desktop compacto", () => {
  const tabletComponents = [
    "src/components/layout/Hero.astro",
    "src/components/sections/Benefits.astro",
    "src/components/sections/ProductShowcase.astro",
    "src/components/sections/Services.astro",
  ];
  const compactDesktopComponents = [
    "src/components/layout/footer.astro",
    "src/components/sections/IndustrialProcess.astro",
    "src/components/sections/WorkGallery.astro",
    "src/components/sections/About.astro",
    "src/components/sections/Contact.astro",
    "src/components/sections/Testimonials.astro",
    "src/components/sections/Faq.astro",
  ];

  for (const component of tabletComponents) {
    const source = readFileSync(resolve(projectRoot, component), "utf8");
    assert.match(
      source,
      /@media \(min-width: 40\.0625rem\) and \(max-width: 80rem\)/,
      component,
    );
  }

  for (const component of compactDesktopComponents) {
    const source = readFileSync(resolve(projectRoot, component), "utf8");
    assert.match(
      source,
      /@media \(min-width: 40\.0625rem\) and \(max-width: 110rem\)/,
      component,
    );
  }

  for (const component of [
    "src/components/sections/ProductShowcase.astro",
    "src/components/sections/Services.astro",
  ]) {
    const source = readFileSync(resolve(projectRoot, component), "utf8");
    assert.match(
      source,
      /@media \(min-width: 80\.0625rem\) and \(max-width: 110rem\)/,
      component,
    );
  }
});

test("las dos tarjetas informativas de servicios permanecen visibles en responsive", () => {
  const home = routeMap.get("/")?.html ?? "";
  const servicesSource = readFileSync(
    resolve(projectRoot, "src/components/sections/Services.astro"),
    "utf8",
  );

  assert.ok(home.includes("Corpóreos en Polifan"));
  assert.ok(home.includes("Impresión de gran formato"));
  assert.doesNotMatch(
    servicesSource,
    /[^{}]*\.services__extras[^{}]*\{[^{}]*display:\s*none/,
  );
});

test("todos los enlaces internos apuntan a rutas y anclas existentes", () => {
  for (const page of pages) {
    const currentRoute = routeFor(page.path);
    const hrefs = extract(page.html, /<a\s[^>]*href="([^"]+)"/gi);

    for (const href of hrefs) {
      if (/^(?:https?:|mailto:|tel:)/i.test(href)) continue;
      const url = new URL(href, `https://qa.local${currentRoute}`);
      const targetRoute = url.pathname.endsWith("/") ? url.pathname : url.pathname;
      const target = routeMap.get(targetRoute) ?? routeMap.get(`${targetRoute}/`);
      assert.ok(target, `${currentRoute} → ${href}`);
      if (url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        assert.match(target.html, new RegExp(`\\bid="${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), `${currentRoute} → ${href}`);
      }
    }
  }
});

test("todos los assets locales referenciados existen", () => {
  for (const page of pages) {
    const references = extract(page.html, /(?:src|href)="(\/_astro\/[^"?#]+|\/robots\.txt)"/gi);
    for (const reference of references) {
      const assetPath = resolve(distRoot, reference.slice(1).split("/").join(sep));
      assert.ok(assetPath.startsWith(`${distRoot}${sep}`));
      assert.ok(existsSync(assetPath), `${routeFor(page.path)} → ${reference}`);
    }
  }
});

test("los 36 nodos entregados tienen trazabilidad en el HTML", () => {
  const expectedNodes = [
    "1033:2504", "1039:3107", "1031:1215", "1060:1260", "861:1632", "642:1797",
    "835:2670", "861:2182", "825:979", "835:1452", "1039:3362", "1059:1017",
    "835:2180", "834:713", "655:982", "642:3220", "1060:1507", "642:3737",
    "642:2986", "642:2027", "1032:2174", "1033:2334", "1095:2870", "1033:2254",
    "1096:3136", "1033:2414", "737:1136", "737:1150", "737:1122", "737:1105",
    "736:1053", "736:1066", "737:1164", "738:1177", "738:1190", "738:1203",
  ];
  const output = pages.map(({ html }) => html).join("\n");
  for (const node of expectedNodes) assert.ok(output.includes(node), node);
});

test("el bundle estático queda dentro del presupuesto de 35 MiB", () => {
  const total = files.filter((path) => existsSync(path)).reduce((sum, path) => sum + statSync(path).size, 0);
  assert.ok(total <= 35 * 1024 * 1024, `El build pesa ${(total / 1024 / 1024).toFixed(1)} MiB`);
});
