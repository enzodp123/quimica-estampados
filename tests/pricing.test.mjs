import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import { catalogList, findCatalogPrice, formatCatalogPrice, priceCatalog, resolveCatalogPrice } from "../src/data/pricing.ts";

// Verificar contra el texto entregado, sin generar expectativas desde los datos del sitio.
const source = readFileSync(new URL("../docs/catalogo-precios-fuente.txt", import.meta.url), "utf8")
  .replaceAll("\r\n", "\n").split("REGLAS DE IMPLEMENTACIÓN PARA CODEX")[0];
const sections = [...source.matchAll(/^(\d+(?:\.\d+)?)\.? [A-ZÁÉÍÓÚÑ][^\n]*$/gm)];
const mapping = {
  "1.1": "calcos-vinilo", "1.2": "calcos-papel", "1.3": "calcos-dtf-uv",
  "2": "tarjetas-personales", "3": "etiquetas", "4.1": "folletos", "4.2": "folletos",
  "5": "gorra-trucker", "6.1": "taza-ceramica", "6.2": "taza-plastica",
  "7.1": "vinilo-sin-troquelar", "7.2": "vinilo-troquelado", "8": "lona-front",
  "9": "fly-banner-gota", "10.1": "portabanner-clasico", "10.2": "portabanner-roll-up",
  "11.1": "remeras-infantiles", "11.2": "remeras-adulto", "12.1": "chomba-algodon",
  "12.2": "chomba-pique", "13.1": "canguro-infantil", "13.2": "canguro-adulto",
  "13.3": "canguro-premium", "13.4": "buzo-cuello-redondo", "13.5": "campera",
};

const expectedRows = [];
for (const [index, section] of sections.entries()) {
  const id = mapping[section[1]];
  if (!id) continue;
  const block = source.slice(section.index, sections[index + 1]?.index ?? source.length);
  let measureIndex = 0;
  for (const match of block.matchAll(/^(?:(\d+) unidad(?:es)?|Pack x(\d+)|([\d,]+ x [\d,]+ mt)):\n((?:- [^\n]*\n?)+)/gm)) {
    const quantity = Number(match[1] ?? match[2] ?? 1);
    const selections = {};
    const before = block.slice(0, match.index);
    if (match[3]) selections.measure = `m${++measureIndex}`;
    else selections.quantity = `x${quantity}`;
    const size = [...before.matchAll(/^(XS|CHICAS|MEDIANAS|GRANDES|XL) -/gm)].at(-1)?.[1];
    if (size) selections.size = size.toLowerCase();
    const side = [...before.matchAll(/^(SIMPLE|DOBLE) FAZ$/gm)].at(-1)?.[1];
    if (side) selections.side = side === "SIMPLE" ? "simple" : "doble";
    if (id === "folletos") selections.format = section[1] === "4.1" ? "estandar" : "chico";
    const lines = match[4];
    const total = lines.match(/^- Total:? (\$[\d.,]+)/m)?.[1]
      ?? lines.match(/^- (\$[\d.,]+)$/m)?.[1];
    const unitPrice = lines.match(/^- Precio unitario: (\$[\d.,]+)/m)?.[1]
      ?? lines.match(/^- (\$[\d.,]+) c\/u/m)?.[1];
    const installments = lines.match(/^- (3 cuotas de \$[\d.,]+)/m)?.[1];
    const reference = lines.match(/^- (?:Equivale a )?(\$[\d.,]+) (?:las|los) 100/m)?.[1];
    expectedRows.push({ id, selections, quantity, total, unitPrice, installments, reference });
  }
}

test("incluye las 13 categorías, 24 productos y cada combinación de la fuente", () => {
  assert.equal(catalogList.length, 24);
  assert.equal(new Set(catalogList.map(({ id }) => id)).size, 24);
  assert.equal(new Set(catalogList.map(({ category }) => category)).size, 13);
  assert.deepEqual(Object.keys(priceCatalog).sort(), [...new Set(Object.values(mapping))].sort());
  assert.ok(expectedRows.length > 100, "El lector debe reconocer la lista completa");
  assert.equal(catalogList.reduce((count, product) => count + product.prices.length, 0), expectedRows.length);

  for (const expected of expectedRows) {
    const label = `${expected.id} ${JSON.stringify(expected.selections)}`;
    const actual = resolveCatalogPrice(expected.id, expected.selections);
    assert.ok(actual, label);
    for (const key of ["quantity", "total", "unitPrice", "installments"]) assert.equal(actual[key], expected[key], `${label}: ${key}`);
    if (expected.reference) assert.ok(actual.note?.includes(expected.reference), `${label}: referencia por 100`);
    else assert.equal(actual.note, undefined, `${label}: no agregar notas de precio`);
  }
});

test("ninguna combinación está duplicada y cada precio se puede seleccionar", () => {
  for (const catalog of catalogList) {
    const keys = catalog.prices.map(({ selections }) => JSON.stringify(Object.entries(selections).sort()));
    assert.equal(new Set(keys).size, keys.length, catalog.id);
    for (const entry of catalog.prices) assert.equal(findCatalogPrice(catalog, entry.selections), entry);
  }
});

test("las cantidades y variantes no definidas devuelven Consultar sin interpolar", () => {
  const missing = [
    ["tarjetas-personales", { side: "simple", quantity: "x200" }],
    ["calcos-dtf-uv", { size: "xs", quantity: "x50" }],
    ["taza-plastica", { quantity: "x50" }],
    ["remeras-adulto", { quantity: "x11" }],
    ["vinilo-troquelado", { measure: "m5" }],
    ["chomba-algodon", { quantity: "x5", print: "solo-logo" }],
    ["tarjetas-personales", { quantity: "x100" }],
    ["folletos", { format: "consultar", side: "simple", quantity: "x100" }],
  ];
  for (const [id, selection] of missing) assert.equal(formatCatalogPrice(resolveCatalogPrice(id, selection)), "Consultar");
  assert.equal(findCatalogPrice(undefined, {}), undefined);
  assert.equal(findCatalogPrice({ ...priceCatalog["remeras-adulto"], requiresConsultation: true }, { quantity: "x5" }), undefined);
  assert.equal(formatCatalogPrice({ total: "$1", selections: {}, requiresConsultation: true }), "Consultar");
});

test("los packs muestran el total y conservan el unitario original en la fuente", () => {
  const entry = resolveCatalogPrice("remeras-adulto", { quantity: "x10" });
  assert.equal(formatCatalogPrice(entry), "$230.000");
  assert.equal(entry.unitPrice, "$23.000");
  assert.equal(entry.total, undefined);
  assert.equal(entry.installments, undefined);
  assert.equal(formatCatalogPrice(resolveCatalogPrice("remeras-adulto", { quantity: "x5" })), "$120.000");
  assert.equal(formatCatalogPrice(resolveCatalogPrice("remeras-adulto", { quantity: "x1" })), "$25.000");
  assert.equal(formatCatalogPrice(resolveCatalogPrice("buzo-cuello-redondo", { quantity: "x5" })), "$152.500");
  assert.equal(formatCatalogPrice(resolveCatalogPrice("canguro-adulto", { quantity: "x10" })), "$350.000");
});

test("el total respeta los centavos y da prioridad al importe publicado", () => {
  assert.equal(formatCatalogPrice({ selections: { quantity: "x3" }, quantity: 3, unitPrice: "$1.234,55" }), "$3.703,65");
  assert.equal(formatCatalogPrice({ selections: { quantity: "x300" }, quantity: 300, unitPrice: "$85,50" }), "$25.650");
  assert.equal(formatCatalogPrice({ selections: { quantity: "x5" }, quantity: 5, unitPrice: "$20", total: "$90" }), "$90");
  assert.equal(formatCatalogPrice({ selections: {}, unitPrice: "$20" }), "Consultar");
  assert.equal(formatCatalogPrice({ selections: {}, quantity: 5, unitPrice: "Consultar" }), "Consultar");
  assert.equal(formatCatalogPrice({ selections: {}, quantity: -5, unitPrice: "$20" }), "Consultar");
});

test("las terminaciones de lona son adicionales y coinciden con la fuente", () => {
  for (const extra of priceCatalog["lona-front"].extras) {
    const block = source.split(`${extra.name}:`)[1];
    assert.ok(block?.startsWith(`\n- ${extra.price} ${extra.unit}`), extra.name);
  }
  assert.equal(resolveCatalogPrice("lona-front", { measure: "m5" }).total, "$98.000");
  assert.equal(resolveCatalogPrice("vinilo-sin-troquelar", { measure: "m5" }).total, "$105.000");
});

test("el catálogo se conserva sin publicar y el menú solo enlaza fichas con imágenes", () => {
  assert.equal(existsSync(new URL("../dist/productos/index.html", import.meta.url)), false);
  assert.ok(existsSync(new URL("../src/components/product/PriceCatalog.astro", import.meta.url)));
  const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
  const nav = html.match(/<nav[^>]+id="main-menu"[\s\S]*?<\/nav>/)[0];
  assert.doesNotMatch(nav, /Catálogo y precios|href="\/productos\/(?:#|\")/);
  const destinations = [...nav.matchAll(/href="(\/productos\/[^"#]+)"/g)].map((match) => match[1]);
  const published = readdirSync(new URL("../dist/productos/", import.meta.url), { withFileTypes: true })
    .filter((entry) => entry.isDirectory()).map((entry) => `/productos/${entry.name}/`);
  assert.deepEqual(destinations.sort(), published.sort());
  const hidden = ["taza-ceramica", "taza-plastica", "vinilo-sin-troquelar", "vinilo-troquelado", "lona-front", "fly-banner-gota", "portabanner-clasico", "portabanner-roll-up", "canguro-premium"];
  for (const id of hidden) {
    assert.ok(priceCatalog[id]?.prices.length, `${id}: conservar los precios`);
    assert.ok(!nav.includes(id), `${id}: oculto en el menú`);
    assert.equal(existsSync(new URL(`../dist/productos/${id}/index.html`, import.meta.url)), false);
  }
});

test("cada ficha inicia con los selectores y el precio de la misma combinación", () => {
  const root = new URL("../dist/productos/", import.meta.url);
  for (const file of readdirSync(root, { withFileTypes: true }).filter((file) => file.isDirectory())) {
    const html = readFileSync(new URL(`${file.name}/index.html`, root), "utf8");
    const catalog = JSON.parse(html.match(/data-catalog="([^"]+)"/)[1].replaceAll("&quot;", '"').replaceAll("&amp;", "&"));
    const selected = {};
    for (const match of html.matchAll(/<fieldset[^>]+data-price-dimension="([^"]+)"[^>]*>(.*?)<\/fieldset>/gs)) {
      const select = match[2].match(/<select\b[^>]*>(.*?)<\/select>/s);
      if (select) {
        const active = [...select[1].matchAll(/<option\b[^>]+>/g)].filter(([tag]) => /\bselected\b/.test(tag));
        assert.equal(active.length, 1, `${file.name}: ${match[1]}`);
        selected[match[1]] = active[0][0].match(/value="([^"]+)"/)[1];
        continue;
      }
      const active = [...match[2].matchAll(/<button[^>]+>/g)].filter(([tag]) => tag.includes('aria-pressed="true"'));
      assert.equal(active.length, 1, `${file.name}: ${match[1]}`);
      selected[match[1]] = active[0][0].match(/data-price-choice="([^"]+)"/)[1];
    }
    const consultOnly = html.includes('data-consult-only="true"');
    const expected = consultOnly ? undefined : findCatalogPrice(catalog, selected);
    const displayed = html.match(/<strong[^>]+data-product-price[^>]*>([^<]+)<\/strong>/)[1];
    assert.equal(displayed, formatCatalogPrice(expected), file.name);
    assert.doesNotMatch(html, /data-price-unit|Precio por unidad|c\/u/, file.name);
    if (!consultOnly) assert.ok(expected, `${file.name}: opción inicial definida`);
    const installmentTag = html.match(/<p[^>]+data-product-installments[^>]*>([^<]*)<\/p>/);
    assert.equal(installmentTag[1], expected?.installments ?? "", file.name);
    assert.equal(/\bhidden\b/.test(installmentTag[0]), !expected?.installments, file.name);
    assert.doesNotMatch(html, /sin interés|<del\b/, file.name);
  }
});
