import type { ImageMetadata } from "astro";
import { productBySlug, type Product } from "./products";
import { priceCatalog } from "./pricing";
import crewneck from "../assets/products/shared-buzo.webp";
import hoodie from "../assets/images/hero-hoodie.webp";
import cap from "../assets/products/gorra-trucker/angled-2026.webp";
import jacket from "../assets/products/printing/campera-capucha.webp";
import shirt from "../assets/products/printing/remera-unisex.webp";
import polo from "../assets/products/printing/chomba-pique.webp";
import graduate from "../assets/products/remera-egresadito/eva.webp";

export interface ProductCardData {
  product: Product;
  name: string;
  description: string;
  image: ImageMetadata;
  badge?: string;
  highlighted?: boolean;
  consultAction?: boolean;
}

type CardDesign = Omit<ProductCardData, "product" | "name"> & { slug: string };

// Imágenes del nodo 1144:2781, con prendas de verano primero. Los precios pertenecen a pricing.ts.
const printingDesigns: CardDesign[] = [
  { slug: "remera-unisex", description: "Remera de manga corta de algodón peinado 24.1", image: shirt },
  { slug: "remera-nino", description: "Remera de manga corta de algodón peinado 24.1", image: shirt },
  { slug: "remera-egresadito", description: "Remera de manga corta de algodón peinado 24.1", image: graduate, highlighted: true },
  { slug: "chomba-pique", description: "Piqué de algodón con cuello polo y botones", image: polo },
  { slug: "gorra-trucker", description: "Gorras trucker sublimadas o estampadas con DTF", image: cap },
  { slug: "buzo-cuello-redondo", description: "Buzo cuello redondo de algodón con frisa clásica", image: crewneck, highlighted: true },
  { slug: "buzo-canguro", description: "Canguro de algodón con frisa clásica", image: hoodie },
  { slug: "campera-capucha", description: "Campera de algodón con frisa clásica con capucha y cierre", image: jacket, highlighted: true },
  { slug: "buzo-canguro-nino", description: "Buzo canguro infantil con frisa clásica", image: hoodie },
];

export const printingCards: ProductCardData[] = printingDesigns.flatMap(({ slug, ...design }) => {
  const product = productBySlug[slug];
  return product ? [{ ...design, name: product.title, product }] : [];
});

export const getRecommendationCards = (product: Product): ProductCardData[] => {
  const category = priceCatalog[product.pricingId].category;
  return printingCards
    .filter((card) => card.product.slug !== product.slug)
    .sort((a, b) => Number(priceCatalog[b.product.pricingId].category === category)
      - Number(priceCatalog[a.product.pricingId].category === category));
};
