import type { ImageMetadata } from "astro";
import {
  formatCatalogPrice,
  resolveCatalogPrice,
  sizeChoices,
  type PriceCatalogId,
} from "./pricing";

import unisexMain from "../assets/products/remera-unisex/main.webp";
import unisexDetail1 from "../assets/products/remera-unisex/detail-1.webp";
import unisexDetail2 from "../assets/products/remera-unisex/detail-2.webp";
import gorraMain from "../assets/products/gorra-trucker/angled-2026.webp";
import gorra1 from "../assets/products/gorra-trucker/detail-1.webp";
import gorra3 from "../assets/products/gorra-trucker/detail-3.webp";
import ninoMain from "../assets/products/remera-nino/main.webp";
import nino1 from "../assets/products/remera-nino/detail-1.webp";
import nino2 from "../assets/products/remera-nino/detail-2.webp";
import egresaditoMain from "../assets/products/remera-egresadito/design-2026.webp";
import egresadito1 from "../assets/products/remera-egresadito/detail-1.webp";
import egresadito2 from "../assets/products/remera-egresadito/detail-2.webp";
import egresadito3 from "../assets/products/remera-egresadito/detail-3.webp";
import chombaAlgodonMain from "../assets/products/chomba-algodon/main.webp";
import chombaAlgodon1 from "../assets/products/chomba-algodon/detail-1.webp";
import chombaAlgodon2 from "../assets/products/chomba-algodon/detail-2.webp";
import chombaAlgodon3 from "../assets/products/chomba-algodon/detail-3.webp";
import chombaAlgodon4 from "../assets/products/chomba-algodon/detail-4.webp";
import buzoRedondoMain from "../assets/products/buzo-cuello-redondo/main.webp";
import buzoRedondo1 from "../assets/products/buzo-cuello-redondo/detail-1.webp";
import buzoRedondo2 from "../assets/products/buzo-cuello-redondo/detail-2.webp";
import canguroMain from "../assets/products/buzo-canguro/main.webp";
import canguro1 from "../assets/products/buzo-canguro/detail-1.webp";
import canguroNinoMain from "../assets/products/buzo-canguro-nino/main.webp";
import canguroNino1 from "../assets/products/buzo-canguro-nino/detail-1.webp";
import canguroNino2 from "../assets/products/buzo-canguro-nino/detail-2.webp";
import camperaMain from "../assets/products/campera-capucha/main.webp";
import campera1 from "../assets/products/campera-capucha/detail-1.webp";
import campera2 from "../assets/products/campera-capucha/detail-2.webp";
import chombaPiqueMain from "../assets/products/chomba-pique/main.webp";
import chombaPique1 from "../assets/products/chomba-pique/detail-1.webp";
import chombaPique2 from "../assets/products/chomba-pique/detail-2.webp";
import chombaPique3 from "../assets/products/chomba-pique/detail-3.webp";
import folletosMain from "../assets/products/folletos/1.webp";
import folletosDetail2 from "../assets/products/folletos/2.webp";
import folletosDetail3 from "../assets/products/folletos/3.webp";
import tarjetasMain from "../assets/services/tarjetas-personales.webp";
import etiquetasMain from "../assets/services/etiquetas.webp";

import canguroPremium1 from "../assets/products/buzo-canguro-premium/detail-1.webp";
import calcosDtf1 from "../assets/products/calcos-dtf-uv/1.webp";
import calcosDtf2 from "../assets/products/calcos-dtf-uv/2.webp";
import calcosDtf3 from "../assets/products/calcos-dtf-uv/3.webp";
import calcosVinilo1 from "../assets/products/calcos-vinilo/1.webp";
import calcosVinilo2 from "../assets/products/calcos-vinilo/2.webp";
import calcosVinilo3 from "../assets/products/calcos-vinilo/3.webp";
import calcosPapel1 from "../assets/products/calcos-papel/1.webp";
import calcosPapel2 from "../assets/products/calcos-papel/2.webp";
import calcosPapel3 from "../assets/products/calcos-papel/3.webp";
import tarjetasPhoto1 from "../assets/works/papeleria/1.webp";
import tarjetasPhoto2 from "../assets/works/papeleria/2.webp";
import tarjetasPhoto3 from "../assets/works/papeleria/3.webp";
import tarjetasPhoto4 from "../assets/works/papeleria/4.webp";

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
  womensSizeGuide?: string;
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
    womensSizeGuide: "/images/talles/remera-dama.webp",
    description: "Remera de algodón peinado 24.1 con terminaciones premium, incluyendo tapacostura en el cuello y refuerzo de costuras en hombros. Ideal para packs corporativos, eventos y merchandising.",
    heroImage: unisexMain,
    gallery: [unisexDetail1, unisexDetail2, unisexMain],
  },
  ...[
    ["calcos-papel", "1033:2504", "Papel"],
    ["calcos-vinilo", "1039:3107", "Vinilo troquelado"],
    ["calcos-dtf-uv", "1039:3362", "DTF UV"],
  ].map(([slug, node, type]): Product => {
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
    options: [
      {
        label: `Tipo de calco: ${type}`,
        values: calcoTypeChoices.map((choice) => ({ ...choice, active: choice.label === type })),
      },
    ],
    sizeTable: calcoSizeTable,
    description:
      "Calcos personalizados. Seleccioná el tipo, tamaño y cantidad para consultar los precios.",
    gallery: slug === "calcos-papel"
      ? [calcosPapel1, calcosPapel2, calcosPapel3]
      : slug === "calcos-vinilo"
        ? [calcosVinilo1, calcosVinilo2, calcosVinilo3]
        : [calcosDtf1, calcosDtf2, calcosDtf3],
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
    description: "Gorras trucker personalizadas con impresión sublimada o DTF, ideales para marcas, eventos, staff y promociones. Diseño resistente, cómodo y con gran impacto visual.",
    heroImage: gorraMain,
    gallery: [gorra1, gorra3, gorraMain],
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
    description: "Remera infantil de algodón peinado 24.1 con terminaciones premium, tapacostura en el cuello y refuerzo en hombros. Ideal para uniformes, eventos y regalos personalizados.",
    heroImage: ninoMain,
    gallery: [nino1, nino2, ninoMain],
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
    sizeValue: "Del 4 al 18",
    sizeGuide: "/images/talles/remera-nino.webp",
    description: "Remera infantil de algodón peinado 24.1 con terminaciones premium, tapacostura en el cuello y refuerzo de costuras en hombros. Diseño cómodo y pensado para personalización en packs institucionales o eventos.",
    heroImage: egresaditoMain,
    gallery: [egresadito1, egresadito2, egresadito3, egresaditoMain],
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
    womensSizeGuide: "/images/talles/chomba-dama.webp",
    description: "Chomba de algodón peinado con cuello polo y botones. Cuenta con terminaciones premium como tapacostura en cuello y refuerzo en hombros. Precio correspondiente a estampado chico adelante y media espalda. Para logo chico adelante, consultar.",
    heroImage: chombaAlgodonMain,
    gallery: [chombaAlgodon1, chombaAlgodon2, chombaAlgodon3, chombaAlgodon4, chombaAlgodonMain],
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
    description: "Buzo cuello redondo de algodón con frisa clásica, terminaciones premium y refuerzo en hombros. Precio correspondiente a estampado chico adelante y media espalda.",
    heroImage: buzoRedondoMain,
    gallery: [buzoRedondo1, buzoRedondo2, buzoRedondoMain],
  },
  {
    slug: "buzo-canguro",
    figmaNodes: ["835:1452"], ticker: true, breadcrumb: "Inicio > Buzos", title: "Buzo canguro frisado", packLabel: "Packs de buzos",
    pricingId: "canguro-adulto", priceSelection: { quantity: "x5" }, price: catalogPrice("canguro-adulto", { quantity: "x5" }),
    options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    sizeGuide: "/images/talles/buzo-canguro.webp",
    description: "Buzo canguro de algodón con frisa, capucha, bolsillo delantero y terminaciones premium. Diseño robusto y cómodo, ideal para estampado chico adelante y media espalda.",
    heroImage: canguroMain,
    gallery: [canguro1, canguroMain],
  },
  {
    slug: "buzo-canguro-premium",
    figmaNodes: [], ticker: true, breadcrumb: "Inicio > Buzos", title: "Buzo canguro frisado premium", packLabel: "Packs de buzos premium",
    pricingId: "canguro-premium", priceSelection: { quantity: "x5" }, price: catalogPrice("canguro-premium", { quantity: "x5" }),
    options: [],
    sizeLabel: "Talles", sizeValue: "Del 1 al 5",
    sizeGuide: "/images/talles/buzo-canguro-premium.webp",
    description: "Buzo canguro premium de frisa invisible, con capucha forrada, ojales y cordón. Terminaciones premium, tapacostura en cuello y refuerzo en hombros. Precio correspondiente a estampado chico adelante y media espalda.",
    heroImage: canguroMain,
    gallery: [canguroPremium1, canguroMain],
  },
  {
    slug: "buzo-canguro-nino",
    figmaNodes: ["834:713"], ticker: true, breadcrumb: "Inicio > Infantil", title: "Buzo canguro niño", packLabel: "Packs de buzo canguro niño",
    pricingId: "canguro-infantil", priceSelection: { quantity: "x5" }, price: catalogPrice("canguro-infantil", { quantity: "x5" }),
    options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 8 al 16",
    sizeGuide: "/images/talles/buzo-canguro-nino.webp",
    description: "Buzo canguro infantil con capucha, bolsillo delantero y terminaciones premium. Ideal para uniformes, regalos y promociones con estampado chico adelante y media espalda.",
    heroImage: canguroNinoMain,
    gallery: [canguroNino1, canguroNino2, canguroNinoMain],
  },
  {
    slug: "campera-capucha",
    figmaNodes: ["835:2180"], ticker: true, breadcrumb: "Inicio > Camperas", title: "Campera con capucha", packLabel: "Packs de campera premium",
    pricingId: "campera", priceSelection: { quantity: "x5" }, price: catalogPrice("campera", { quantity: "x5" }),
    options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    sizeGuide: "/images/talles/campera-capucha.webp",
    description: "Campera de algodón frisa clásica con capucha, bolsillos y cierre. Con terminaciones premium, tapacostura en cuello y refuerzo en hombros. Precio correspondiente a estampado chico adelante y media espalda.",
    heroImage: camperaMain,
    gallery: [campera1, campera2, camperaMain],
  },
  {
    slug: "chomba-pique",
    figmaNodes: ["1059:1017"], ticker: true, breadcrumb: "Inicio > Chombas", title: "Chomba", seoTitle: "Chomba de piqué personalizada",
    pricingId: "chomba-pique", priceSelection: { quantity: "x5" }, packLabel: "Packs de chombas", price: catalogPrice("chomba-pique", { quantity: "x5" }),
    options: [{ label: "Tipo: piqué de algodón", values: [{ label: "Algodón peinado", href: "/productos/chomba-algodon/" }, { label: "Piqué de algodón", active: true, href: "/productos/chomba-pique/" }] }],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    sizeGuide: "/images/talles/chomba-pique.webp",
    womensSizeGuide: "/images/talles/chomba-dama.webp",
    description: "Chomba de piqué de algodón o algodón peinado, con cuello polo y botones. Cuenta con terminaciones premium como tapacostura en cuello y refuerzo en hombros. Precio correspondiente a estampado chico adelante y media espalda. Para logo chico adelante, consultar.",
    heroImage: chombaPiqueMain,
    gallery: [chombaPique1, chombaPique2, chombaPique3, chombaPiqueMain],
  },
  {
    slug: "folletos",
    figmaNodes: ["1060:1507"], ticker: true, breadcrumb: "Inicio > Servicios > Folletos", title: "Folletos", packLabel: "Packs de folletos",
    pricingId: "folletos", priceSelection: { format: "estandar", side: "simple", quantity: "x100" },
    price: catalogPrice("folletos", { format: "estandar", side: "simple", quantity: "x100" }),
    options: [],
    sizeValue: "Papel ilustración, terminación brillante o matelina, hasta 120 gr", description: "Folletos impresos con alta definición para comunicar tu marca con claridad y estilo.", gallery: [folletosMain, folletosDetail2, folletosDetail3],
  },
  {
    slug: "tarjetas-personales",
    figmaNodes: ["1095:2870"], ticker: true, breadcrumb: "Inicio > Servicios > Tarjetas Personales", title: "Tarjetas personales", packLabel: "Packs de tarjetas personales",
    pricingId: "tarjetas-personales", priceSelection: { side: "simple", quantity: "x100" },
    price: catalogPrice("tarjetas-personales", { side: "simple", quantity: "x100" }),
    options: [],
    sizeValue: "Papel terminación mate o brillante, hasta 250 g", description: "Tarjetas personales impresas en alta definición, ideales para presentar tu marca con un acabado profesional y elegante.", gallery: [tarjetasMain, tarjetasPhoto1, tarjetasPhoto2, tarjetasPhoto3, tarjetasPhoto4],
  },
  {
    slug: "etiquetas",
    figmaNodes: ["1096:3136"], ticker: true, breadcrumb: "Inicio > Servicios > Etiquetas", title: "Etiquetas", packLabel: "Packs de etiquetas",
    pricingId: "etiquetas", priceSelection: { size: "xs", quantity: "x100" },
    price: catalogPrice("etiquetas", { size: "xs", quantity: "x100" }),
    options: [],
    description: "Etiquetas personalizadas para prendas, packaging y productos, con impresión nítida y terminación profesional.", gallery: [etiquetasMain],
  },
];

// Solo las fichas con imágenes se publican y aparecen en la navegación.
export const visibleProducts = products.filter((product) => product.gallery.length > 0);

export const productBySlug = Object.fromEntries(visibleProducts.map((product) => [product.slug, product])) as Record<string, Product>;
