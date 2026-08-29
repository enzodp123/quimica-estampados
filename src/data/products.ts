import type { ImageMetadata } from "astro";

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
  packLabel: string;
  price: string;
  oldPrice?: string;
  installments?: string;
  discount?: string;
  quantities: string[];
  quantityLabel?: string;
  shipping: string;
  options: ProductOption[];
  colorLabel?: string;
  colors?: string[];
  sizeLabel?: string;
  sizeValue?: string;
  actions?: Array<"cotizar" | "consultar">;
  notices: string[];
  promotion?: string;
  description: string;
  sizeTable?: string[];
  gallery: ImageMetadata[];
}

const apparelDescription =
  "Algodón peinado 24.1 con terminaciones premium como tapa costura en el cuello y refuerzo de costura en hombros.";

const apparelSizes = [
  "Talle S: largo 70 cm · ancho de sisa 63 cm · largo manga 57 cm",
  "Talle M: largo 72 cm · ancho de sisa 65 cm · largo manga 59 cm",
  "Talle L: largo 74 cm · ancho de sisa 67 cm · largo manga 60 cm",
  "Talle XL: largo 76 cm · ancho de sisa 69 cm · largo manga 62 cm",
];

const packChoices = ["X5", "X10", "X20"];
const printChoices = ["X100", "X300", "X500"];
const apparelNotices = [
  "Trabajamos todos los colores, consultanos tiempo de producción.",
  "Envíos full: 48/72 hs hábiles para colores negro, blanco y gris.",
];

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
    packLabel: "Packs de remeras",
    price: "$160.000",
    installments: "3 cuotas sin interés de $53.333,33",
    discount: "21% de descuento con transferencia/depósito",
    quantities: packChoices,
    quantityLabel: "Cantidad: pack x5",
    shipping: "Envío gratis a partir de 10 unidades",
    options: [],
    colorLabel: "Colores flash",
    colors: ["#f2f2ef", "#585858", "#f0ede6"],
    sizeLabel: "Talles",
    sizeValue: "Del 1 al 10",
    actions: ["consultar"],
    notices: apparelNotices,
    description: `Remera manga corta: ${apparelDescription}`,
    sizeTable: apparelSizes,
    gallery: [oversizeMain, oversizeDetail2, oversizeDetail3],
  },
  {
    slug: "remera-unisex",
    figmaNodes: ["642:1797", "642:2027", "642:3737"],
    ticker: true,
    breadcrumb: "Inicio > Pack de Remeras",
    title: "Remera unisex",
    packLabel: "Packs de remeras",
    price: "$126.400",
    oldPrice: "$160.000",
    installments: "3 cuotas sin interés de $53.333,33",
    discount: "21% de descuento con transferencia/depósito",
    quantities: packChoices,
    quantityLabel: "Cantidad: pack x5",
    shipping: "Envío gratis a partir de 10 unidades",
    options: [],
    colorLabel: "Colores flash",
    colors: ["#f2f2ef", "#585858", "#f0ede6"],
    sizeLabel: "Talles",
    sizeValue: "Del 1 al 10",
    actions: ["consultar"],
    notices: apparelNotices,
    description: `Remera manga corta: ${apparelDescription}`,
    gallery: [unisexMain, unisexDetail2, unisexDetail3],
  },
  ...[
    ["calcos-papel", "1033:2504", "Papel", "$6.000", "$7.260", "$2.420", calcosPapelMain, calcosPapel1, calcosPapel2, calcosPapel3],
    ["calcos-vinilo", "1039:3107", "Vinilo troquelado", "$9.500", "$11.490", "$3.830", calcosViniloMain, calcosVinilo1, calcosVinilo2, calcosVinilo3],
    ["calcos-dtf-uv", "1039:3362", "DTF UV", "$17.500", "$21.174", "$7.058", calcosDtfMain, calcosDtf1, calcosDtf2, calcosDtf3],
  ].map(([slug, node, type, price, oldPrice, installment, ...gallery]) => ({
    slug: slug as string,
    figmaNodes: [node as string],
    ticker: true,
    breadcrumb: "Inicio > Servicios > Calcos",
    title: "Calcos",
    packLabel: "Packs de calcos",
    price: price as string,
    oldPrice: oldPrice as string,
    installments: `3 cuotas de ${installment as string}`,
    quantities: printChoices,
    quantityLabel: "Cantidad: pack x100",
    shipping: "Envío gratis a partir de 300 unidades",
    options: [
      {
        label: `Tipo de calco: ${type}`,
        values: calcoTypeChoices.map((choice) => ({ ...choice, active: choice.label === type })),
      },
      {
        label: "Seleccionar medida",
        values: [{ label: "Tamaño: XS", active: true }],
        note: "En los packs aparecen medidas estándar, las más usadas, pero imprimimos en la medida que tu proyecto necesite.",
      },
    ],
    colorLabel: "Bases",
    sizeValue: "Color · transparente · holográficas",
    actions: ["cotizar", "consultar"],
    notices: [
      "Tipo de corte: cuadradas, rectangulares, circulares o con la forma que quieras.",
      "Envíos full: 48/72 hs hábiles.",
    ],
    description:
      "Calcos aptos para interior y exterior, impresos con tintas ecosolventes, colores vibrantes, resistentes al agua. Ideales para vidrieras, vehículos, cartelería, packaging, objetos y diferentes superficies.",
    gallery: gallery as ImageMetadata[],
  })),
  {
    slug: "gorra-trucker",
    figmaNodes: ["1060:1260"],
    ticker: true,
    breadcrumb: "Inicio > Pack de Gorras",
    title: "Gorra trucker",
    packLabel: "Packs de gorra trucker",
    price: "$47.500",
    oldPrice: "$57.475",
    installments: "3 cuotas sin interés de $19.158,33",
    discount: "21% de descuento con transferencia/depósito",
    quantities: packChoices,
    quantityLabel: "Cantidad: pack x5",
    shipping: "Envío gratis a partir de 10 unidades",
    options: [],
    colorLabel: "Colores flash",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Regulable",
    actions: ["consultar"],
    notices: apparelNotices,
    description: "Gorra trucker con frente personalizable, visera curva y ajuste posterior regulable.",
    gallery: [gorraMain, gorra1, gorra2, gorra3],
  },
  {
    slug: "remera-nino",
    figmaNodes: ["861:1632"],
    ticker: true,
    breadcrumb: "Inicio > Infantil",
    title: "Remera niño",
    packLabel: "Packs de remeras",
    price: "$92.035",
    oldPrice: "$116.500",
    installments: "3 cuotas sin interés de $38.833,33",
    discount: "21% de descuento con transferencia/depósito",
    quantities: packChoices,
    quantityLabel: "Cantidad: pack x5",
    shipping: "Envío gratis a partir de 10 unidades",
    options: [],
    colorLabel: "Colores",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Del 4 al 18",
    actions: ["consultar"],
    notices: apparelNotices,
    description: `Remera infantil: ${apparelDescription}`,
    gallery: [ninoMain, nino1, nino2],
  },
  {
    slug: "remera-egresadito",
    figmaNodes: ["861:2182"],
    ticker: true,
    breadcrumb: "Inicio > Infantil",
    title: "Remera egresadito",
    packLabel: "Packs de remeras",
    price: "$126.400",
    oldPrice: "$160.000",
    installments: "3 cuotas sin interés de $38.833,33",
    discount: "21% de descuento con transferencia/depósito",
    quantities: packChoices,
    quantityLabel: "Cantidad: pack x5",
    shipping: "Envío gratis a partir de 15 unidades",
    options: [],
    colorLabel: "Colores flash",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Del 4 al 12",
    actions: ["consultar"],
    promotion: "Promoción: remera para la seño de regalo.",
    notices: [apparelNotices[0], "Envíos full: 48/72 hs hábiles para color blanco."],
    description: `Remera infantil: ${apparelDescription}`,
    gallery: [egresaditoMain, egresadito1, egresadito2, egresadito3],
  },
  {
    slug: "chomba-algodon",
    figmaNodes: ["835:2670"],
    ticker: true,
    breadcrumb: "Inicio > Chombas",
    title: "Chomba",
    packLabel: "Cotización personalizada",
    price: "Consultar",
    quantities: [],
    shipping: "Envío gratis a partir de 10 unidades",
    options: [{ label: "Tipo: algodón peinado", values: [{ label: "Algodón peinado", active: true }, { label: "Piqué de algodón" }] }],
    colorLabel: "Colores flash",
    colors: ["#efefec", "#545454", "#0e0e0e"],
    sizeLabel: "Talles",
    sizeValue: "Del 1 al 6",
    actions: ["consultar"],
    notices: [apparelNotices[0], "Demora de producción y entrega: 10 días aproximadamente."],
    description: "Chomba de algodón peinado, con cuello polo y botones. Terminaciones premium, tapacostura en cuello y refuerzo en hombros.",
    gallery: [chombaAlgodonMain, chombaAlgodon1, chombaAlgodon2, chombaAlgodon3, chombaAlgodon4],
  },
  {
    slug: "buzo-cuello-redondo",
    figmaNodes: ["825:979"],
    ticker: true,
    breadcrumb: "Inicio > Buzos",
    title: "Buzo cuello redondo",
    packLabel: "Packs de buzos",
    price: "$178.303",
    oldPrice: "$225.700",
    installments: "3 cuotas sin interés de $75.233,33",
    discount: "21% de descuento con transferencia/depósito",
    quantities: packChoices,
    quantityLabel: "Cantidad: pack x5",
    shipping: "Envío gratis a partir de 10 unidades",
    options: [], colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    actions: ["consultar"], notices: apparelNotices, description: apparelDescription,
    gallery: [buzoRedondoMain, buzoRedondo1, buzoRedondo2, buzoRedondo3],
  },
  {
    slug: "buzo-canguro",
    figmaNodes: ["835:1452"], ticker: true, breadcrumb: "Inicio > Buzos", title: "Buzo canguro frizado", packLabel: "Packs de buzos",
    price: "$207.217", oldPrice: "$262.300", installments: "3 cuotas sin interés de $87.433,33", discount: "21% de descuento con transferencia/depósito",
    quantities: packChoices, quantityLabel: "Cantidad: pack x5", shipping: "Envío gratis a partir de 10 unidades", options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    actions: ["consultar"], notices: apparelNotices, description: apparelDescription, gallery: [canguroMain, canguro1, canguro2, canguro3],
  },
  {
    slug: "buzo-canguro-nino",
    figmaNodes: ["834:713"], ticker: true, breadcrumb: "Inicio > Infantil", title: "Buzo canguro niño", packLabel: "Packs de buzo canguro niño",
    price: "$163.846", oldPrice: "$207.400", installments: "3 cuotas sin interés de $69.133,33", discount: "21% de descuento con transferencia/depósito",
    quantities: packChoices, quantityLabel: "Cantidad: pack x5", shipping: "Envío gratis a partir de 10 unidades", options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 8 al 16",
    actions: ["consultar"], notices: apparelNotices, description: apparelDescription, gallery: [canguroNinoMain, canguroNino1, canguroNino2, canguroNino3],
  },
  {
    slug: "campera-capucha",
    figmaNodes: ["835:2180"], ticker: true, breadcrumb: "Inicio > Camperas", title: "Campera con capucha", packLabel: "Packs de campera premium",
    price: "$207.217", oldPrice: "$262.300", installments: "3 cuotas sin interés de $87.433,33", discount: "21% de descuento con transferencia/depósito",
    quantities: packChoices, quantityLabel: "Cantidad: pack x5", shipping: "Envío gratis a partir de 10 unidades", options: [],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    actions: ["consultar"], notices: apparelNotices, description: apparelDescription, gallery: [camperaMain, campera1],
  },
  {
    slug: "chomba-pique",
    figmaNodes: ["1059:1017"], ticker: true, breadcrumb: "Inicio > Chombas", title: "Chomba", packLabel: "Cotización personalizada", price: "Consultar",
    quantities: [], shipping: "Envío gratis a partir de 10 unidades",
    options: [{ label: "Tipo: piqué de algodón", values: [{ label: "Algodón peinado" }, { label: "Piqué de algodón", active: true }] }],
    colorLabel: "Colores flash", colors: ["#efefec", "#545454", "#0e0e0e"], sizeLabel: "Talles", sizeValue: "Del 1 al 10",
    actions: ["consultar"], notices: [apparelNotices[0], "Demora de producción y entrega: 10 días aproximadamente."],
    description: "Chomba de piqué de algodón, con cuello polo y botones. Terminaciones premium, tapacostura en cuello y refuerzo en hombros.",
    gallery: [chombaPiqueMain, chombaPique1, chombaPique2, chombaPique3, chombaPique4],
  },
  {
    slug: "folletos",
    figmaNodes: ["1060:1507"], ticker: true, breadcrumb: "Inicio > Servicios > Folletos", title: "Folletos", packLabel: "Packs de folletos",
    price: "$18.000", oldPrice: "$21.780", installments: "3 cuotas de $7.260", quantities: printChoices, quantityLabel: "Cantidad: pack x100",
    shipping: "Envío gratis a partir de 300 unidades",
    options: [{ label: "Tipo de folleto: simple faz", values: [{ label: "Simple faz", active: true }, { label: "Doble faz" }] }, { label: "Medidas", values: [{ label: "Estándar 10 × 15 cm", active: true }, { label: "Chico 7 × 10 cm" }] }],
    sizeValue: "Papel ilustración brillante o mate, hasta 120 g", actions: ["consultar"], notices: ["Corte recto o personalizado según el proyecto.", "Envíos full: 48/72 hs hábiles."],
    description: "Folletos impresos en alta definición, disponibles en simple o doble faz y distintos gramajes.", gallery: [folletosMain, folletos1, folletos2, folletos3],
  },
  {
    slug: "tarjetas-personales",
    figmaNodes: ["1095:2870"], ticker: true, breadcrumb: "Inicio > Servicios > Tarjetas Personales", title: "Tarjetas personales", packLabel: "Packs de tarjetas personales",
    price: "$18.000", oldPrice: "$21.780", installments: "3 cuotas de $7.260", quantities: printChoices, quantityLabel: "Cantidad: pack x100",
    shipping: "Envío gratis a partir de 300 unidades",
    options: [{ label: "Tipo de tarjeta: simple faz", values: [{ label: "Simple faz", active: true }, { label: "Doble faz" }] }, { label: "Medida", values: [{ label: "8,5 × 5,5 cm", active: true }, { label: "9 × 5 cm" }] }],
    sizeValue: "Papel terminación mate o brillante, hasta 250 g", actions: ["consultar"], notices: ["Corte recto o personalizado según el proyecto.", "Envíos full: 48/72 hs hábiles."],
    description: "Tarjetas personales impresas en alta definición, disponibles en simple o doble faz y diferentes terminaciones.", gallery: [tarjetasMain, tarjetas1, tarjetas2, tarjetas3],
  },
  {
    slug: "etiquetas",
    figmaNodes: ["1096:3136"], ticker: true, breadcrumb: "Inicio > Servicios > Etiquetas", title: "Etiquetas", packLabel: "Packs de etiquetas",
    price: "$6.000", oldPrice: "$7.260", installments: "3 cuotas de $2.420", quantities: printChoices, quantityLabel: "Cantidad: pack x100",
    shipping: "Envío gratis a partir de 300 unidades",
    options: [{ label: "Seleccionar medida", values: [{ label: "Tamaño: XS", active: true }], note: "Imprimimos también en la medida exacta que tu proyecto necesite." }],
    actions: ["consultar"], notices: ["Corte cuadrado, rectangular, circular o con forma personalizada.", "Envíos full: 48/72 hs hábiles."],
    description: "Etiquetas personalizadas para prendas, packaging y productos. Impresión nítida y terminaciones profesionales.", gallery: [etiquetasMain, etiquetas1, etiquetas2, etiquetas3],
  },
];

export const productBySlug = Object.fromEntries(products.map((product) => [product.slug, product])) as Record<string, Product>;
