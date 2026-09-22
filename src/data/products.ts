import type { ImageMetadata } from "astro";
import {
  formatCatalogPrice,
  resolveCatalogPrice,
  sizeChoices,
  type PriceCatalogId,
} from "./pricing";

import oversizeMain from "../assets/products/remera-oversize/main.png";
import oversizeDetail2 from "../assets/products/remera-oversize/detail-2.png";
import oversizeDetail3 from "../assets/products/remera-oversize/detail-3.png";
import unisexMain from "../assets/products/remera-unisex/main.png";
import unisexDetail2 from "../assets/products/remera-unisex/detail-2.png";
import unisexDetail3 from "../assets/products/remera-unisex/detail-3.png";
import calcosPapelHero from "../assets/products/shared-calco.png";
import calcosPapelMain from "../assets/products/calcos-papel/figma-thumb-1.png";
import calcosPapel1 from "../assets/products/calcos-papel/figma-thumb-2.png";
import calcosPapel2 from "../assets/products/calcos-papel/figma-thumb-3.png";
import calcosPapel3 from "../assets/products/calcos-papel/figma-thumb-3.png";
import calcosViniloMain from "../assets/products/calcos-vinilo/main.png";
import calcosVinilo1 from "../assets/products/calcos-vinilo/detail-1.png";
import calcosVinilo2 from "../assets/products/calcos-vinilo/detail-2.png";
import calcosVinilo3 from "../assets/products/calcos-vinilo/detail-3.png";
import calcosDtfMain from "../assets/products/calcos-dtf-uv/main.png";
import calcosDtf1 from "../assets/products/calcos-dtf-uv/detail-1.png";
import calcosDtf2 from "../assets/products/calcos-dtf-uv/detail-2.png";
import calcosDtf3 from "../assets/products/calcos-dtf-uv/detail-3.png";
import gorraMain from "../assets/products/gorra-trucker/main.png";
import gorra1 from "../assets/products/gorra-trucker/detail-1.png";
import gorra2 from "../assets/products/gorra-trucker/detail-2.png";
import gorra3 from "../assets/products/gorra-trucker/detail-3.png";
import ninoMain from "../assets/products/remera-nino/main.png";
import nino1 from "../assets/products/remera-nino/detail-1.png";
import nino2 from "../assets/products/remera-nino/detail-2.png";
import egresaditoMain from "../assets/products/remera-egresadito/main.png";
import egresadito1 from "../assets/products/remera-egresadito/detail-1.png";
import egresadito2 from "../assets/products/remera-egresadito/detail-2.png";
import egresadito3 from "../assets/products/remera-egresadito/detail-3.png";
import chombaAlgodonMain from "../assets/products/chomba-algodon/main.png";
import chombaAlgodon1 from "../assets/products/chomba-algodon/detail-1.png";
import chombaAlgodon2 from "../assets/products/chomba-algodon/detail-2.png";
import chombaAlgodon3 from "../assets/products/chomba-algodon/detail-3.png";
import chombaAlgodon4 from "../assets/products/chomba-algodon/detail-4.png";
import buzoRedondoMain from "../assets/products/buzo-cuello-redondo/main.png";
import buzoRedondo1 from "../assets/products/buzo-cuello-redondo/detail-1.png";
import buzoRedondo2 from "../assets/products/buzo-cuello-redondo/detail-2.png";
import buzoRedondo3 from "../assets/products/buzo-cuello-redondo/detail-3.png";
import canguroMain from "../assets/products/buzo-canguro/main.png";
import canguro1 from "../assets/products/buzo-canguro/detail-1.png";
import canguro2 from "../assets/products/buzo-canguro/detail-2.png";
import canguro3 from "../assets/products/buzo-canguro/detail-3.png";
import canguroNinoMain from "../assets/products/buzo-canguro-nino/main.png";
import canguroNino1 from "../assets/products/buzo-canguro-nino/detail-1.png";
import canguroNino2 from "../assets/products/buzo-canguro-nino/detail-2.png";
import canguroNino3 from "../assets/products/buzo-canguro-nino/detail-3.png";
import camperaMain from "../assets/products/campera-capucha/main.png";
import campera1 from "../assets/products/campera-capucha/detail-1.png";
import chombaPiqueMain from "../assets/products/chomba-pique/main.png";
import chombaPique1 from "../assets/products/chomba-pique/detail-1.png";
import chombaPique2 from "../assets/products/chomba-pique/detail-2.png";
import chombaPique3 from "../assets/products/chomba-pique/detail-3.png";
import chombaPique4 from "../assets/products/chomba-pique/detail-4.png";
import folletosMain from "../assets/products/folletos/main.png";
import folletos1 from "../assets/products/folletos/detail-1.png";
import folletos2 from "../assets/products/folletos/detail-2.png";
import folletos3 from "../assets/products/folletos/detail-3.png";
import tarjetasMain from "../assets/products/tarjetas-personales/main.png";
import tarjetas1 from "../assets/products/tarjetas-personales/detail-1.png";
import tarjetas2 from "../assets/products/tarjetas-personales/detail-2.png";
import tarjetas3 from "../assets/products/tarjetas-personales/detail-3.png";
import etiquetasMain from "../assets/products/etiquetas/main.png";
import etiquetas1 from "../assets/products/etiquetas/detail-1.png";
import etiquetas2 from "../assets/products/etiquetas/detail-2.png";
import etiquetas3 from "../assets/products/etiquetas/detail-3.png";

export interface ProductChoice {
  label: string;
  value?: string;
  active?: boolean;
  href?: string;
}

export interface ProductOption {
  label: string;
  values: ProductChoice[];
  note?: string;
}

export interface Product {
  slug: string;
  figmaNodes: string[];
  ticker?: boolean;
  breadcrumb: string;
  title: string;
  seoTitle?: string;
  pricingId: PriceCatalogId;
  priceSelection: Record<string, string>;
  packLabel: string;
  price: string;
  requiresConsultation?: boolean;
  options: ProductOption[];
  colorLabel?: string;
  colors?: string[];
  sizeLabel?: string;
  sizeValue?: string;
  sizeGuide?: string;
  description: string;
  sizeTable?: string[];
  gallery: ImageMetadata[];
  heroImage?: ImageMetadata;
}

const apparelDescription =
  "Algodón peinado 24.1 con terminaciones premium como tapacostura en el cuello y refuerzo de costura en hombros.";

const catalogPrice = (pricingId: PriceCatalogId, selection: Record<string, string>) =>
  formatCatalogPrice(resolveCatalogPrice(pricingId, selection));

const calcoSizeTable = sizeChoices.map((size) => `${size.label}: ${size.description} (${size.examples?.join(", ")})`);

const calcoTypeChoices: ProductChoice[] = [
  { label: "Papel", href: "/productos/calcos-papel/" },
  { label: "Vinilo troquelado", href: "/productos/calcos-vinilo/" },
  { label: "DTF UV", href: "/productos/calcos-dtf-uv/" },
];

export const products: Product[] = [
  {
    slug: "remera-oversize",
    figmaNodes: ["642:3220", "642:2986", "655:982"],
    breadcrumb: "Inicio > Pack de Remeras",
    title: "Remera oversize personalizable",
    pricingId: "remeras-adulto",
    priceSelection: { quantity: "x5" },
    packLabel: "Packs de remeras",
    price: "Consultar",
    requiresConsultation: true,
    options: [],
    colorLabel: "Colores flash",
    colors: ["#f2f2ef", "#585858", "#f0ede6"],
    sizeLabel: "Talles",
    sizeValue: "Consultar",
    description: `Remera manga corta: ${apparelDescription}`,
    gallery: [oversizeMain, oversizeDetail2, oversizeDetail3],
  },
  {
    slug: "remera-unisex",
    figmaNodes: ["642:1797", "642:2027", "642:3737"],
    ticker: true,
    breadcrumb: "Inicio > Pack de Remeras",
    title: "Remera unisex",
    pricingId: "remeras-adulto",
    priceSelection: { quantity: "x5" },
    packLabel: "Packs de remeras",
    price: catalogPrice("remeras-adulto", { quantity: "x5" }),
    options: [],
    colorLabel: "Colores flash",
    colors: ["#f2f2ef", "#585858", "#f0ede6"],
    sizeLabel: "Talles",
    sizeValue: "Del 1 al 10",
    sizeGuide: "/images/talles/remera-unisex.webp",
    description: `Remera manga corta: ${apparelDescription}`,
    gallery: [unisexMain, unisexDetail2, unisexDetail3],
  },
  ...[
    ["calcos-papel", "1033:2504", "Papel", calcosPapelMain, calcosPapel1, calcosPapel2, calcosPapel3],
    ["calcos-vinilo", "1039:3107", "Vinilo troquelado", calcosViniloMain, calcosVinilo1, calcosVinilo2, calcosVinilo3],
    ["calcos-dtf-uv", "1039:3362", "DTF UV", calcosDtfMain, calcosDtf1, calcosDtf2, calcosDtf3],
  ].map(([slug, node, type, ...gallery]): Product => {
    const pricingId: "calcos-papel" | "calcos-vinilo" | "calcos-dtf-uv" =
      slug as "calcos-papel" | "calcos-vinilo" | "calcos-dtf-uv";
    const priceSelection = { size: "xs", quantity: "x100" };
    

    return ({
    slug: slug as string,
    figmaNodes: [node as string],
    ticker: true,
    breadcrumb: "Inicio > Servicios > Calcos",
    title: "Calcos",
    seoTitle: `Calcos ${type as string}`,
    pricingId,
    priceSelection,
    packLabel: "Packs de calcos",
    price: catalogPrice(pricingId, priceSelection),
    heroImage: pricingId === "calcos-papel" ? calcosPapelHero : undefined,
    options: [
      {
        label: `Tipo de calco: ${type}`,
        values: calcoTypeChoices.map((choice) => ({ ...choice, active: choice.label === type })),
      },
    ],
    sizeTable: calcoSizeTable,
    description:
      "Calcos personalizados. Seleccioná el tipo, tamaño y cantidad para consultar los precios.",
    gallery: gallery as ImageMetadata[],
  });
  }) as Product[],
  {
    slug: "gorra-trucker",
    figmaNodes: ["1060:1260"],
    ticker: true,
    breadcrumb: "Inicio > Pack de Gorras",
    title: "Gorra trucker",
    pricingId: "gorra-trucker",
    priceSelection: { quantity: "x5" },
    packLabel: "Packs de gorra trucker",
    price: catalogPrice("gorra-trucker", { quantity: "x5" }),
    options: [],
    colorLabel: "Colores flash",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Regulable",
    description: "Gorra trucker con frente personalizable, visera curva y ajuste posterior regulable.",
    gallery: [gorraMain, gorra1, gorra2, gorra3],
  },
  {
    slug: "remera-nino",
    figmaNodes: ["861:1632"],
    ticker: true,
    breadcrumb: "Inicio > Infantil",
    title: "Remera niño",
    pricingId: "remeras-infantiles",
    priceSelection: { quantity: "x5" },
    packLabel: "Packs de remeras",
    price: catalogPrice("remeras-infantiles", { quantity: "x5" }),
    options: [],
    colorLabel: "Colores",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Del 4 al 18",
    sizeGuide: "/images/talles/remera-nino.webp",
    description: `Remera infantil: ${apparelDescription}`,
    gallery: [ninoMain, nino1, nino2],
  },
  {
    slug: "remera-egresadito",
    figmaNodes: ["861:2182"],
    ticker: true,
    breadcrumb: "Inicio > Infantil",
    title: "Remera egresadito",
    pricingId: "remeras-infantiles",
    priceSelection: { quantity: "x5" },
    packLabel: "Packs de remeras",
    price: "Consultar",
    requiresConsultation: true,
    options: [],
    colorLabel: "Colores flash",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Consultar",
    description: `Remera infantil: ${apparelDescription}`,
    gallery: [egresaditoMain, egresadito1, egresadito2, egresadito3],
  },
  {
    slug: "chomba-algodon",
    figmaNodes: ["835:2670"],
    ticker: true,
    breadcrumb: "Inicio > Chombas",
    title: "Chomba",
    seoTitle: "Chomba de algodón personalizada",
    pricingId: "chomba-algodon",
    priceSelection: { quantity: "x5" },
    packLabel: "Packs de chombas",
    price: catalogPrice("chomba-algodon", { quantity: "x5" }),
    options: [{ label: "Tipo: algodón peinado", values: [{ label: "Algodón peinado", active: true, href: "/productos/chomba-algodon/" }, { label: "Piqué de algodón", href: "/productos/chomba-pique/" }] }],
    colorLabel: "Colores flash",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Del 1 al 6",
    sizeGuide: "/images/talles/chomba-algodon.webp",
    description: "Chomba de algodón peinado, con cuello polo y botones. Terminaciones premium, tapacostura en cuello y refuerzo en hombros.",
    gallery: [chombaAlgodonMain, chombaAlgodon1, chombaAlgodon2, chombaAlgodon3, chombaAlgodon4],
  },
  {
    slug: "buzo-cuello-redondo",
    figmaNodes: ["825:979"],
    ticker: true,
    breadcrumb: "Inicio > Buzos",
    title: "Buzo cuello redondo",
    pricingId: "buzo-cuello-redondo",
    priceSelection: { quantity: "x5" },
    packLabel: "Packs de buzos",
    price: catalogPrice("buzo-cuello-redondo", { quantity: "x5" }),
    options: [], colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    sizeGuide: "/images/talles/buzo-cuello-redondo.webp",
    description: "Buzo de cuello redondo en algodón frizado, personalizable y con terminaciones reforzadas.",
    gallery: [buzoRedondoMain, buzoRedondo1, buzoRedondo2, buzoRedondo3],
  },
  {
    slug: "buzo-canguro",
    figmaNodes: ["835:1452"], ticker: true, breadcrumb: "Inicio > Buzos", title: "Buzo canguro frizado", packLabel: "Packs de buzos",
    pricingId: "canguro-adulto", priceSelection: { quantity: "x5" }, price: catalogPrice("canguro-adulto", { quantity: "x5" }),
    options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    sizeGuide: "/images/talles/buzo-canguro.webp",
    description: "Buzo canguro frizado con capucha, bolsillo delantero y terminaciones reforzadas.",
    gallery: [canguroMain, canguro1, canguro2, canguro3],
  },
  {
    slug: "buzo-canguro-nino",
    figmaNodes: ["834:713"], ticker: true, breadcrumb: "Inicio > Infantil", title: "Buzo canguro niño", packLabel: "Packs de buzo canguro niño",
    pricingId: "canguro-infantil", priceSelection: { quantity: "x5" }, price: catalogPrice("canguro-infantil", { quantity: "x5" }),
    options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 8 al 16",
    sizeGuide: "/images/talles/buzo-canguro-nino.webp",
    description: "Buzo canguro infantil con capucha, bolsillo delantero y superficie personalizable.",
    gallery: [canguroNinoMain, canguroNino1, canguroNino2, canguroNino3],
  },
  {
    slug: "campera-capucha",
    figmaNodes: ["835:2180"], ticker: true, breadcrumb: "Inicio > Camperas", title: "Campera con capucha", packLabel: "Packs de campera premium",
    pricingId: "campera", priceSelection: { quantity: "x5" }, price: catalogPrice("campera", { quantity: "x5" }),
    options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    sizeGuide: "/images/talles/campera-capucha.webp",
    description: "Campera con capucha y cierre frontal, preparada para personalización textil.",
    gallery: [camperaMain, campera1],
  },
  {
    slug: "chomba-pique",
    figmaNodes: ["1059:1017"], ticker: true, breadcrumb: "Inicio > Chombas", title: "Chomba", seoTitle: "Chomba de piqué personalizada",
    pricingId: "chomba-pique", priceSelection: { quantity: "x5" }, packLabel: "Packs de chombas", price: catalogPrice("chomba-pique", { quantity: "x5" }),
    options: [{ label: "Tipo: piqué de algodón", values: [{ label: "Algodón peinado", href: "/productos/chomba-algodon/" }, { label: "Piqué de algodón", active: true, href: "/productos/chomba-pique/" }] }],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    sizeGuide: "/images/talles/chomba-pique.webp",
    description: "Chomba de piqué de algodón, con cuello polo y botones. Terminaciones premium, tapacostura en cuello y refuerzo en hombros.",
    gallery: [chombaPiqueMain, chombaPique1, chombaPique2, chombaPique3, chombaPique4],
  },
  {
    slug: "folletos",
    figmaNodes: ["1060:1507"], ticker: true, breadcrumb: "Inicio > Servicios > Folletos", title: "Folletos", packLabel: "Packs de folletos",
    pricingId: "folletos", priceSelection: { format: "estandar", side: "simple", quantity: "x100" },
    price: catalogPrice("folletos", { format: "estandar", side: "simple", quantity: "x100" }),
    options: [],
    sizeValue: "Papel ilustración, terminación brillante o matelina, hasta 120 gr", description: "Folletos impresos en alta definición, disponibles en simple o doble faz y distintos gramajes.", gallery: [folletosMain, folletos1, folletos2, folletos3],
  },
  {
    slug: "tarjetas-personales",
    figmaNodes: ["1095:2870"], ticker: true, breadcrumb: "Inicio > Servicios > Tarjetas Personales", title: "Tarjetas personales", packLabel: "Packs de tarjetas personales",
    pricingId: "tarjetas-personales", priceSelection: { side: "simple", quantity: "x100" },
    price: catalogPrice("tarjetas-personales", { side: "simple", quantity: "x100" }),
    options: [],
    sizeValue: "Papel terminación mate o brillante, hasta 250 g", description: "Tarjetas personales impresas en alta definición, disponibles en simple o doble faz y diferentes terminaciones.", gallery: [tarjetasMain, tarjetas1, tarjetas2, tarjetas3],
  },
  {
    slug: "etiquetas",
    figmaNodes: ["1096:3136"], ticker: true, breadcrumb: "Inicio > Servicios > Etiquetas", title: "Etiquetas", packLabel: "Packs de etiquetas",
    pricingId: "etiquetas", priceSelection: { size: "xs", quantity: "x100" },
    price: catalogPrice("etiquetas", { size: "xs", quantity: "x100" }),
    options: [],
    description: "Etiquetas personalizadas para prendas, packaging y productos. Impresión nítida y terminaciones profesionales.", gallery: [etiquetasMain, etiquetas1, etiquetas2, etiquetas3],
  },
];

// Solo las fichas con imágenes se publican y aparecen en la navegación.
export const visibleProducts = products.filter((product) => product.gallery.length > 0);

export const productBySlug = Object.fromEntries(visibleProducts.map((product) => [product.slug, product])) as Record<string, Product>;
