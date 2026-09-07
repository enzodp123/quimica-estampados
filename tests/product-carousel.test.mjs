import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import { getCarouselTarget } from "../src/scripts/product-carousel.ts";

const featuredSlugs = [
  "buzo-cuello-redondo", "buzo-canguro", "gorra-trucker", "campera-capucha",
  "remera-unisex", "chomba-pique", "remera-nino", "remera-egresadito", "buzo-canguro-nino",
];
const trackContent = (html, id) => html.match(new RegExp(`<section\\b[^>]*id="${id}"[^>]*>([\\s\\S]*?)</section>`))?.[1] ?? "";
const getCards = (html) => [...html.matchAll(/<a\b[^>]*data-product-card="([^"]+)"[^>]*>[\s\S]*?<\/a>/g)];

test("las flechas recorren una tarjeta y respetan ambos extremos", () => {
  const positions = [0, 478, 956, 1434, 1912];
  assert.equal(getCarouselTarget(positions, 0, 1000, 1), 478);
  assert.equal(getCarouselTarget(positions, 478, 1000, 1), 956);
  assert.equal(getCarouselTarget(positions, 956, 1000, 1), 1000);
  assert.equal(getCarouselTarget(positions, 1000, 1000, 1), 1000);
  assert.equal(getCarouselTarget(positions, 1000, 1000, -1), 956);
  assert.equal(getCarouselTarget(positions, 478, 1000, -1), 0);
  assert.equal(getCarouselTarget(positions, 0, 1000, -1), 0);
});

test("las flechas se adaptan a anchos móviles y desplazamientos táctiles parciales", () => {
  const positions = [0, 365.5, 731, 1096.5];
  assert.equal(getCarouselTarget(positions, 180, 1096.5, 1), 365.5);
  assert.equal(getCarouselTarget(positions, 180, 1096.5, -1), 0);
  assert.equal(getCarouselTarget(positions, 364.8, 1096.5, 1), 731);
  assert.equal(getCarouselTarget(positions, 366.2, 1096.5, -1), 0);
  assert.equal(getCarouselTarget([0], 0, 0, 1), 0);
  assert.equal(getCarouselTarget([], 0, 0, -1), 0);
});

test("Impresiones publica las nueve tarjetas del Figma en su orden y con precios de la fuente", () => {
  const html = readFileSync("dist/index.html", "utf8");
  const content = trackContent(html, "featured-products-track");
  const cards = getCards(content);
  assert.deepEqual(cards.map((match) => match[1]), featuredSlugs);
  assert.match(html, /data-figma-node="1144:2781"/);
  assert.equal((content.match(/class="product-card__badge"/g) ?? []).length, 2);
  for (const card of cards) {
    assert.match(card[0], new RegExp(`href="/productos/${card[1]}/"`));
    assert.match(card[0], /<img\b[^>]*src="\/_astro\//);
  }
  const expectedPrices = {
    "buzo-cuello-redondo": "$152.500", "buzo-canguro": "$185.000",
    "gorra-trucker": "$47.500", "campera-capucha": "$215.000",
    "remera-unisex": "$120.000", "chomba-pique": "$165.000", "remera-nino": "$95.000", "buzo-canguro-nino": "$170.000",
  };
  for (const [slug, price] of Object.entries(expectedPrices)) {
    assert.ok(cards.find((card) => card[1] === slug)?.[0].includes(price), `${slug}: ${price}`);
  }
  const graduate = cards.find((card) => card[1] === "remera-egresadito")[0];
  assert.match(graduate, /Consultar packs disponibles/);
  assert.doesNotMatch(graduate, /\$|>X15</);
  assert.doesNotMatch(content, /c\/u/);
});

test("cada ficha recomienda productos publicados y excluye el producto actual", () => {
  for (const slug of readdirSync("dist/productos")) {
    const html = readFileSync(`dist/productos/${slug}/index.html`, "utf8");
    const cards = getCards(trackContent(html, "related-products-track"));
    const slugs = cards.map((match) => match[1]);
    assert.equal(slugs.length, featuredSlugs.includes(slug) ? 8 : 9, slug);
    assert.equal(new Set(slugs).size, slugs.length, slug);
    assert.equal(slugs.includes(slug), false, slug);
    assert.ok(slugs.every((value) => featuredSlugs.includes(value)), slug);
    assert.match(html, /aria-label="Ver productos anteriores"[^>]*aria-controls="related-products-track"/);
    assert.match(html, /aria-label="Ver productos siguientes"[^>]*aria-controls="related-products-track"/);
  }
});
