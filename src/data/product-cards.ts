import type { ImageMetadata } from "astro";
import { productBySlug, type Product } from "./products";
import { priceCatalog } from "./pricing";
import crewneck from "../assets/products/shared-buzo.png";
import hoodie from "../assets/images/hero-hoodie.png";
import cap from "../assets/products/shared-gorra.png";
import jacket from "../assets/products/printing/campera-capucha.png";
import shirt from "../assets/products/printing/remera-unisex.png";
import polo from "../assets/products/printing/chomba-pique.png";
import graduate from "../assets/products/printing/remera-egresadito.png";

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
  { slug: "buzo-cuello-redondo", name: "Buzo cuello redondo", description: "Terminaciones premium", image: crewneck, highlighted: true },
  { slug: "buzo-canguro", name: "Buzo canguro frizado", description: "Terminaciones premium", image: hoodie },
  { slug: "gorra-trucker", name: "Gorra visera", description: "Truckers sublimadas o con DTF", image: cap },
  { slug: "campera-capucha", name: "Campera con capucha", description: "Frisa clásica con capucha, bolsillos y cierre", image: jacket, highlighted: true },
  { slug: "remera-unisex", name: "Remera unisex", description: "Algodón premium peinado 24.1", image: shirt },
  { slug: "chomba-pique", name: "Chomba", description: "Piqué de algodón", image: polo, consultAction: true },
  { slug: "remera-nino", name: "Remera unisex", description: "Algodón premium peinado 24.1", image: shirt, badge: "Infantil" },
  { slug: "remera-egresadito", name: "Remera egresadito", description: "Algodón premium peinado 24.1", image: graduate, highlighted: true },
  { slug: "buzo-canguro-nino", name: "Buzo canguro frizado", description: "Terminaciones premium", image: hoodie, badge: "Infantil" },
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
