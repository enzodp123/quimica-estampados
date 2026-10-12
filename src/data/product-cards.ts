import type { ImageMetadata } from "astro";
import { productBySlug, type Product } from "./products";
import { priceCatalog } from "./pricing";
import crewneck from "../assets/products/shared-buzo.webp";
import hoodie from "../assets/images/hero-hoodie.webp";
import cap from "../assets/products/gorra-trucker/angled-2026.webp";
import jacket from "../assets/products/printing/campera-capucha.webp";
import shirt from "../assets/products/printing/remera-unisex.webp";
import polo from "../assets/products/printing/chomba-pique.webp";
import graduate from "../assets/products/remera-egresadito/design-2026.webp";

export interface ProductCardData {
  product: Product;
  name: string;
  description: string;
  image: ImageMetadata;
  badge?: string;
  highlighted?: boolean;
  consultAction?: boolean;
}

type CardDesign = Omit<ProductCardData, "product"> & { slug: string };

// Imágenes y orden del nodo 1144:2781. Los precios pertenecen a pricing.ts.
const printingDesigns: CardDesign[] = [
  { slug: "buzo-cuello-redondo", name: "Buzo cuello redondo", description: "Buzo cuello redondo de algodón con frisa clásica", image: crewneck, highlighted: true },
  { slug: "buzo-canguro", name: "Buzo canguro frisado", description: "Canguro de algodón con frisa clásica", image: hoodie },
  { slug: "gorra-trucker", name: "Gorra visera", description: "Gorras Truckers: Truckers sublimadas o con DTF", image: cap },
  { slug: "campera-capucha", name: "Campera con capucha", description: "Campera de algodón frisa clásica con capucha y cierre", image: jacket, highlighted: true },
  { slug: "remera-unisex", name: "Remera unisex", description: "Remera manga corta: algodón peinado 24.1", image: shirt },
  { slug: "chomba-pique", name: "Chomba", description: "Piqué de algodón con cuello polo y botones", image: polo },
  { slug: "remera-nino", name: "Remera unisex", description: "Remera manga corta: algodón peinado 24.1", image: shirt, badge: "Infantil" },
  { slug: "remera-egresadito", name: "Remera egresadito", description: "Remera manga corta: algodón peinado 24.1", image: graduate, highlighted: true },
  { slug: "buzo-canguro-nino", name: "Buzo canguro frisado", description: "Buzo canguro niño con frisa clásica", image: hoodie, badge: "Infantil" },
];

export const printingCards: ProductCardData[] = printingDesigns.flatMap(({ slug, ...design }) => {
  const product = productBySlug[slug];
  return product ? [{ ...design, product }] : [];
});

export const getRecommendationCards = (product: Product): ProductCardData[] => {
  const category = priceCatalog[product.pricingId].category;
  return printingCards
    .filter((card) => card.product.slug !== product.slug)
    .sort((a, b) => Number(priceCatalog[b.product.pricingId].category === category)
      - Number(priceCatalog[a.product.pricingId].category === category));
};
