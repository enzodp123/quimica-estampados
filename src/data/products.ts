import type { ImageMetadata } from "astro";
import {
  formatCatalogPrice,
  priceCatalog,
  resolveCatalogPrice,
  type PriceCatalogId,
} from "./pricing";

import oversizeMain from "../assets/products/remera-oversize/main.png";
import oversizeDetail2 from "../assets/products/remera-oversize/detail-2.png";
import oversizeDetail3 from "../assets/products/remera-oversize/detail-3.png";
import unisexMain from "../assets/products/remera-unisex/main.png";
import unisexDetail2 from "../assets/products/remera-unisex/detail-2.png";
import unisexDetail3 from "../assets/products/remera-unisex/detail-3.png";
import calcosPapelMain from "../assets/products/calcos-papel/main.png";
import calcosPapel1 from "../assets/products/calcos-papel/detail-1.png";
import calcosPapel2 from "../assets/products/calcos-papel/detail-2.png";
import calcosPapel3 from "../assets/products/calcos-papel/detail-3.png";
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
  priceKey?: string;
  values: ProductChoice[];
  note?: string;
}

export type ProductAction = "cotizar" | "consultar";

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
  quantities: string[];
  quantityLabel?: string;
  shipping?: string;
  options: ProductOption[];
  colorLabel?: string;
  colors?: string[];
  sizeLabel?: string;
  sizeValue?: string;
  actions?: ProductAction[];
  notices: string[];
  promotion?: string;
  description: string;
  sizeTable?: string[];
  gallery: ImageMetadata[];
}

const apparelDescription =
  "Algodón peinado 24.1 con terminaciones premium como tapa costura en el cuello y refuerzo de costura en hombros.";

const consultActions: ProductAction[] = ["consultar"];
const quoteAndConsultActions: ProductAction[] = ["cotizar", "consultar"];

const catalogPrice = (pricingId: PriceCatalogId, selection: Record<string, string>) =>
  formatCatalogPrice(resolveCatalogPrice(pricingId, selection));

const catalogQuantities = (pricingId: PriceCatalogId) =>
  priceCatalog[pricingId].variants
    .find((variant) => variant.key === "quantity")
    ?.options.map((option) => option.value.toUpperCase()) ?? [];

const catalogNotices = (pricingId: PriceCatalogId) => [...priceCatalog[pricingId].notes];

const calcoSizeChoices: ProductChoice[] = priceCatalog["calcos-papel"].variants[0].options.map((option, index) => ({
  label: `${option.label} · ${option.description}`,
  value: option.value,
  active: index === 0,
}));

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
    price: catalogPrice("remeras-adulto", { quantity: "x5" }),
    quantities: catalogQuantities("remeras-adulto"),
    quantityLabel: "Cantidad",
    options: [],
    colorLabel: "Colores flash",
    colors: ["#f2f2ef", "#585858", "#f0ede6"],
    sizeLabel: "Talles",
    sizeValue: "Del 1 al 10",
    actions: consultActions,
    notices: catalogNotices("remeras-adulto"),
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
    quantities: catalogQuantities("remeras-adulto"),
    quantityLabel: "Cantidad",
    options: [],
    colorLabel: "Colores flash",
    colors: ["#f2f2ef", "#585858", "#f0ede6"],
    sizeLabel: "Talles",
    sizeValue: "Del 1 al 10",
    actions: consultActions,
    notices: catalogNotices("remeras-adulto"),
    description: `Remera manga corta: ${apparelDescription}`,
    gallery: [unisexMain, unisexDetail2, unisexDetail3],
  },
  ...[
    ["calcos-papel", "1033:2504", "Papel", calcosPapelMain, calcosPapel1, calcosPapel2, calcosPapel3],
    ["calcos-vinilo", "1039:3107", "Vinilo troquelado", calcosViniloMain, calcosVinilo1, calcosVinilo2, calcosVinilo3],
    ["calcos-dtf-uv", "1039:3362", "DTF UV", calcosDtfMain, calcosDtf1, calcosDtf2, calcosDtf3],
  ].map(([slug, node, type, ...gallery]) => {
    const pricingId = slug as "calcos-papel" | "calcos-vinilo" | "calcos-dtf-uv";
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
    quantities: catalogQuantities(pricingId),
    quantityLabel: "Cantidad",
    options: [
      {
        label: `Tipo de calco: ${type}`,
        values: calcoTypeChoices.map((choice) => ({ ...choice, active: choice.label === type })),
      },
      {
        label: "Seleccionar medida",
        priceKey: "size",
        values: calcoSizeChoices,
        note: "Si la medida no corresponde a una categoría definida, consultar precio.",
      },
    ],
    colorLabel: "Bases",
    sizeValue: "Color · transparente · holográficas",
    actions: quoteAndConsultActions,
    notices: [
      "Tipo de corte: cuadradas, rectangulares, circulares o con la forma que quieras.",
    ],
    description:
      "Calcos aptos para interior y exterior, impresos con tintas ecosolventes, colores vibrantes, resistentes al agua. Ideales para vidrieras, vehículos, cartelería, packaging, objetos y diferentes superficies.",
    gallery: gallery as ImageMetadata[],
  });
  }),
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
    quantities: catalogQuantities("gorra-trucker"),
    quantityLabel: "Cantidad",
    options: [],
    colorLabel: "Colores flash",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Regulable",
    actions: consultActions,
    notices: catalogNotices("gorra-trucker"),
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
    quantities: catalogQuantities("remeras-infantiles"),
    quantityLabel: "Cantidad",
    options: [],
    colorLabel: "Colores",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Del 4 al 18",
    actions: consultActions,
    notices: catalogNotices("remeras-infantiles"),
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
    price: catalogPrice("remeras-infantiles", { quantity: "x5" }),
    quantities: catalogQuantities("remeras-infantiles"),
    quantityLabel: "Cantidad",
    options: [],
    colorLabel: "Colores flash",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Del 4 al 18",
    actions: consultActions,
    notices: catalogNotices("remeras-infantiles"),
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
    quantities: catalogQuantities("chomba-algodon"),
    quantityLabel: "Cantidad",
    options: [{ label: "Tipo: algodón peinado", values: [{ label: "Algodón peinado", active: true }, { label: "Piqué de algodón" }] }],
    colorLabel: "Colores flash",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Del 1 al 5",
    actions: consultActions,
    notices: catalogNotices("chomba-algodon"),
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
    quantities: catalogQuantities("buzo-cuello-redondo"),
    quantityLabel: "Cantidad",
    options: [], colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Consultar",
    actions: consultActions,
    notices: catalogNotices("buzo-cuello-redondo"),
    description: "Buzo de cuello redondo en algodón frizado, personalizable y con terminaciones reforzadas.",
    gallery: [buzoRedondoMain, buzoRedondo1, buzoRedondo2, buzoRedondo3],
  },
  {
    slug: "buzo-canguro",
    figmaNodes: ["835:1452"], ticker: true, breadcrumb: "Inicio > Buzos", title: "Buzo canguro frizado", packLabel: "Packs de buzos",
    pricingId: "canguro-adulto", priceSelection: { quantity: "x5" }, price: catalogPrice("canguro-adulto", { quantity: "x5" }),
    quantities: catalogQuantities("canguro-adulto"), quantityLabel: "Cantidad", options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    actions: consultActions,
    notices: catalogNotices("canguro-adulto"),
    description: "Buzo canguro frizado con capucha, bolsillo delantero y terminaciones reforzadas.",
    gallery: [canguroMain, canguro1, canguro2, canguro3],
  },
  {
    slug: "buzo-canguro-nino",
    figmaNodes: ["834:713"], ticker: true, breadcrumb: "Inicio > Infantil", title: "Buzo canguro niño", packLabel: "Packs de buzo canguro niño",
    pricingId: "canguro-infantil", priceSelection: { quantity: "x5" }, price: catalogPrice("canguro-infantil", { quantity: "x5" }),
    quantities: catalogQuantities("canguro-infantil"), quantityLabel: "Cantidad", options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 4 al 18",
    actions: consultActions,
    notices: catalogNotices("canguro-infantil"),
    description: "Buzo canguro infantil con capucha, bolsillo delantero y superficie personalizable.",
    gallery: [canguroNinoMain, canguroNino1, canguroNino2, canguroNino3],
  },
  {
    slug: "campera-capucha",
    figmaNodes: ["835:2180"], ticker: true, breadcrumb: "Inicio > Camperas", title: "Campera con capucha", packLabel: "Packs de campera premium",
    pricingId: "campera", priceSelection: { quantity: "x5" }, price: catalogPrice("campera", { quantity: "x5" }),
    quantities: catalogQuantities("campera"), quantityLabel: "Cantidad", options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Consultar",
    actions: consultActions,
    notices: catalogNotices("campera"),
    description: "Campera con capucha y cierre frontal, preparada para personalización textil.",
    gallery: [camperaMain, campera1],
  },
  {
    slug: "chomba-pique",
    figmaNodes: ["1059:1017"], ticker: true, breadcrumb: "Inicio > Chombas", title: "Chomba", seoTitle: "Chomba de piqué personalizada",
    pricingId: "chomba-pique", priceSelection: { quantity: "x5" }, packLabel: "Packs de chombas", price: catalogPrice("chomba-pique", { quantity: "x5" }),
    quantities: catalogQuantities("chomba-pique"), quantityLabel: "Cantidad",
    options: [{ label: "Tipo: piqué de algodón", values: [{ label: "Algodón peinado" }, { label: "Piqué de algodón", active: true }] }],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    actions: consultActions, notices: catalogNotices("chomba-pique"),
    description: "Chomba de piqué de algodón, con cuello polo y botones. Terminaciones premium, tapacostura en cuello y refuerzo en hombros.",
    gallery: [chombaPiqueMain, chombaPique1, chombaPique2, chombaPique3, chombaPique4],
  },
  {
    slug: "folletos",
    figmaNodes: ["1060:1507"], ticker: true, breadcrumb: "Inicio > Servicios > Folletos", title: "Folletos", packLabel: "Packs de folletos",
    price: "$18.000", oldPrice: "$21.780", installments: "3 cuotas de $7.260", quantities: printChoices, quantityLabel: "Cantidad: pack x100",
    shipping: "Envío gratis a partir de 300 unidades",
    options: [{ label: "Tipo de folleto: simple faz", values: [{ label: "Simple faz", active: true }, { label: "Doble faz" }] }, { label: "Medidas", values: [{ label: "Estándar 10 × 15 cm", active: true }, { label: "Chico 7 × 10 cm" }] }],
    sizeValue: "Papel ilustración brillante o mate, hasta 120 g", actions: consultActions, notices: ["Corte recto o personalizado según el proyecto.", "Envíos full: 48/72 hs hábiles."],
    description: "Folletos impresos en alta definición, disponibles en simple o doble faz y distintos gramajes.", gallery: [folletosMain, folletos1, folletos2, folletos3],
  },
  {
    slug: "tarjetas-personales",
    figmaNodes: ["1095:2870"], ticker: true, breadcrumb: "Inicio > Servicios > Tarjetas Personales", title: "Tarjetas personales", packLabel: "Packs de tarjetas personales",
    price: "$18.000", oldPrice: "$21.780", installments: "3 cuotas de $7.260", quantities: printChoices, quantityLabel: "Cantidad: pack x100",
    shipping: "Envío gratis a partir de 300 unidades",
    options: [{ label: "Tipo de tarjeta: simple faz", values: [{ label: "Simple faz", active: true }, { label: "Doble faz" }] }, { label: "Medida", values: [{ label: "8,5 × 5,5 cm", active: true }, { label: "9 × 5 cm" }] }],
    sizeValue: "Papel terminación mate o brillante, hasta 250 g", actions: consultActions, notices: ["Corte recto o personalizado según el proyecto.", "Envíos full: 48/72 hs hábiles."],
    description: "Tarjetas personales impresas en alta definición, disponibles en simple o doble faz y diferentes terminaciones.", gallery: [tarjetasMain, tarjetas1, tarjetas2, tarjetas3],
  },
  {
    slug: "etiquetas",
    figmaNodes: ["1096:3136"], ticker: true, breadcrumb: "Inicio > Servicios > Etiquetas", title: "Etiquetas", packLabel: "Packs de etiquetas",
    price: "$6.000", oldPrice: "$7.260", installments: "3 cuotas de $2.420", quantities: printChoices, quantityLabel: "Cantidad: pack x100",
    shipping: "Envío gratis a partir de 300 unidades",
    options: [{ label: "Seleccionar medida", values: [{ label: "Tamaño: XS", active: true }], note: "Imprimimos también en la medida exacta que tu proyecto necesite." }],
    actions: consultActions, notices: ["Corte cuadrado, rectangular, circular o con forma personalizada.", "Envíos full: 48/72 hs hábiles."],
    description: "Etiquetas personalizadas para prendas, packaging y productos. Impresión nítida y terminaciones profesionales.", gallery: [etiquetasMain, etiquetas1, etiquetas2, etiquetas3],
  },
];

export const productBySlug = Object.fromEntries(products.map((product) => [product.slug, product])) as Record<string, Product>;
