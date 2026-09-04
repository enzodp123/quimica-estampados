export interface CatalogChoice {
  value: string;
  label: string;
  description?: string;
}

export interface CatalogDimension {
  key: string;
  label: string;
  options: CatalogChoice[];
}

export interface CatalogPrice {
  selections: Record<string, string>;
  quantity?: number;
  total?: string;
  unitPrice?: string;
  installments?: string;
  note?: string;
}

export interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  description?: string;
  variants: CatalogDimension[];
  sizes?: string[];
  prices: CatalogPrice[];
  notes: string[];
}

const sizeChoices: CatalogChoice[] = [
  { value: "xs", label: "XS", description: "Hasta 12 cm²" },
  { value: "chicas", label: "Chicas", description: "Hasta 25 cm²" },
  { value: "medianas", label: "Medianas", description: "Hasta 50 cm²" },
  { value: "grandes", label: "Grandes", description: "Hasta 75 cm²" },
  { value: "xl", label: "XL", description: "Hasta 100 cm²" },
];

const quantityChoices = (...quantities: number[]): CatalogChoice[] =>
  quantities.map((quantity) => ({ value: `x${quantity}`, label: quantity === 1 ? "1 unidad" : `Pack x${quantity}` }));

const price = (
  selections: Record<string, string>,
  quantity: number,
  values: Omit<CatalogPrice, "selections" | "quantity">,
): CatalogPrice => ({ selections, quantity, ...values });

const paperPrices: CatalogPrice[] = [
  price({ size: "xs", quantity: "x100" }, 100, { total: "$6.000", unitPrice: "$60", installments: "3 cuotas de $2.420" }),
  price({ size: "xs", quantity: "x300" }, 300, { total: "$16.500", unitPrice: "$55", installments: "3 cuotas de $6.655" }),
  price({ size: "xs", quantity: "x500" }, 500, { total: "$27.000", unitPrice: "$54", installments: "3 cuotas de $10.890" }),
  price({ size: "chicas", quantity: "x100" }, 100, { total: "$12.500", unitPrice: "$125", installments: "3 cuotas de $5.040" }),
  price({ size: "chicas", quantity: "x300" }, 300, { total: "$34.500", unitPrice: "$115", installments: "3 cuotas de $13.900" }),
  price({ size: "chicas", quantity: "x500" }, 500, { total: "$55.000", unitPrice: "$110", installments: "3 cuotas de $22.183" }),
  price({ size: "medianas", quantity: "x100" }, 100, { total: "$25.600", unitPrice: "$256", installments: "3 cuotas de $10.325" }),
  price({ size: "medianas", quantity: "x300" }, 300, { total: "$72.900", unitPrice: "$243", installments: "3 cuotas de $29.400" }),
  price({ size: "medianas", quantity: "x500" }, 500, { total: "$119.000", unitPrice: "$238", installments: "3 cuotas de $48.000" }),
  price({ size: "grandes", quantity: "x100" }, 100, { total: "$37.500", unitPrice: "$375", installments: "3 cuotas de $15.125" }),
  price({ size: "grandes", quantity: "x300" }, 300, { total: "$103.500", unitPrice: "$345", installments: "3 cuotas de $41.745" }),
  price({ size: "grandes", quantity: "x500" }, 500, { total: "$165.000", unitPrice: "$330", installments: "3 cuotas de $66.550" }),
  price({ size: "xl", quantity: "x100" }, 100, { total: "$50.000", unitPrice: "$500", installments: "3 cuotas de $20.166" }),
  price({ size: "xl", quantity: "x300" }, 300, { total: "$138.000", unitPrice: "$460", installments: "3 cuotas de $55.660" }),
  price({ size: "xl", quantity: "x500" }, 500, { total: "$220.000", unitPrice: "$440", installments: "3 cuotas de $88.733" }),
];

const apparelNotes = [
  "El precio corresponde a un estampado chico adelante y media espalda.",
  "Tapacostura en cuello y refuerzo en hombros.",
];

const apparelPrices = (values: Array<[number, string]>): CatalogPrice[] =>
  values.map(([quantity, amount]) => price(
    { quantity: `x${quantity}` },
    quantity,
    quantity === 1 ? { total: amount } : { unitPrice: amount },
  ));

export const priceCatalog = {
  "calcos-vinilo": {
    id: "calcos-vinilo",
    name: "Calcos vinilo troqueladas",
    category: "Calcos",
    variants: [
      { key: "size", label: "Tamaño", options: sizeChoices },
      { key: "quantity", label: "Cantidad", options: quantityChoices(100, 300, 500) },
    ],
    prices: [
      price({ size: "xs", quantity: "x100" }, 100, { total: "$9.500", unitPrice: "$95", installments: "3 cuotas de $3.830" }),
      price({ size: "xs", quantity: "x300" }, 300, { total: "$25.650", unitPrice: "$85,50", installments: "3 cuotas de $5.600" }),
      price({ size: "xs", quantity: "x500" }, 500, { total: "$38.000", unitPrice: "$76", installments: "3 cuotas de $15.300" }),
      price({ size: "chicas", quantity: "x100" }, 100, { total: "$17.500", unitPrice: "$175", installments: "3 cuotas de $7.060" }),
      price({ size: "chicas", quantity: "x300" }, 300, { total: "$47.250", unitPrice: "$157,50", installments: "3 cuotas de $19.000" }),
      price({ size: "chicas", quantity: "x500" }, 500, { total: "$70.000", unitPrice: "$140", installments: "3 cuotas de $28.230" }),
      price({ size: "medianas", quantity: "x100" }, 100, { total: "$32.000", unitPrice: "$320", installments: "3 cuotas de $19.900" }),
      price({ size: "medianas", quantity: "x300" }, 300, { total: "$86.400", unitPrice: "$288", installments: "3 cuotas de $34.850" }),
      price({ size: "medianas", quantity: "x500" }, 500, { total: "$128.000", unitPrice: "$256", installments: "3 cuotas de $51.600" }),
      price({ size: "grandes", quantity: "x100" }, 100, { total: "$50.000", unitPrice: "$500", installments: "3 cuotas de $20.160" }),
      price({ size: "grandes", quantity: "x300" }, 300, { total: "$135.000", unitPrice: "$450", installments: "3 cuotas de $54.450" }),
      price({ size: "grandes", quantity: "x500" }, 500, { total: "$212.500", unitPrice: "$425", installments: "3 cuotas de $85.700" }),
      price({ size: "xl", quantity: "x100" }, 100, { total: "$69.000", unitPrice: "$690", installments: "3 cuotas de $27.830" }),
      price({ size: "xl", quantity: "x300" }, 300, { total: "$186.000", unitPrice: "$620", installments: "3 cuotas de $75.000" }),
      price({ size: "xl", quantity: "x500" }, 500, { total: "$293.000", unitPrice: "$586", installments: "3 cuotas de $118.175" }),
    ],
    notes: [],
  },
  "calcos-papel": {
    id: "calcos-papel",
    name: "Calcos papel adhesivo",
    category: "Calcos",
    variants: [
      { key: "size", label: "Tamaño", options: sizeChoices },
      { key: "quantity", label: "Cantidad", options: quantityChoices(100, 300, 500) },
    ],
    prices: paperPrices,
    notes: [],
  },
  "calcos-dtf-uv": {
    id: "calcos-dtf-uv",
    name: "Calcos DTF UV",
    category: "Calcos",
    variants: [
      { key: "size", label: "Tamaño", options: sizeChoices },
      { key: "quantity", label: "Cantidad", options: quantityChoices(50, 100) },
    ],
    prices: [
      price({ size: "xs", quantity: "x100" }, 100, { total: "$17.500", unitPrice: "$175", installments: "3 cuotas de $7.058" }),
      price({ size: "chicas", quantity: "x50" }, 50, { total: "$20.000", unitPrice: "$400", installments: "3 cuotas de $8.066" }),
      price({ size: "chicas", quantity: "x100" }, 100, { total: "$36.000", unitPrice: "$360", installments: "3 cuotas de $14.520" }),
      price({ size: "medianas", quantity: "x50" }, 50, { total: "$37.500", unitPrice: "$750", installments: "3 cuotas de $15.125" }),
      price({ size: "medianas", quantity: "x100" }, 100, { total: "$69.000", unitPrice: "$690", installments: "3 cuotas de $27.830" }),
      price({ size: "grandes", quantity: "x50" }, 50, { total: "$55.000", unitPrice: "$1.100", installments: "3 cuotas de $22.185" }),
      price({ size: "grandes", quantity: "x100" }, 100, { total: "$99.000", unitPrice: "$990", installments: "3 cuotas de $39.930" }),
      price({ size: "xl", quantity: "x50" }, 50, { total: "$70.000", unitPrice: "$1.400", installments: "3 cuotas de $28.233" }),
      price({ size: "xl", quantity: "x100" }, 100, { total: "$120.000", unitPrice: "$1.200", installments: "3 cuotas de $48.400" }),
    ],
    notes: [],
  },
  "tarjetas-personales": {
    id: "tarjetas-personales",
    name: "Tarjetas personales",
    category: "Tarjetas",
    description: "Papel terminación mate o brillante, hasta 250 gr.",
    variants: [
      { key: "side", label: "Impresión", options: [{ value: "simple", label: "Simple faz" }, { value: "doble", label: "Doble faz" }] },
      { key: "quantity", label: "Cantidad", options: quantityChoices(100, 300, 500) },
    ],
    sizes: ["8,5 × 5,5 cm", "9 × 5 cm"],
    prices: [
      price({ side: "simple", quantity: "x100" }, 100, { total: "$18.000" }),
      price({ side: "simple", quantity: "x300" }, 300, { total: "$48.000", note: "$16.000 las 100" }),
      price({ side: "simple", quantity: "x500" }, 500, { total: "$75.000", note: "$15.000 las 100" }),
      price({ side: "doble", quantity: "x100" }, 100, { total: "$25.000" }),
      price({ side: "doble", quantity: "x300" }, 300, { total: "$66.000", note: "$22.000 las 100" }),
      price({ side: "doble", quantity: "x500" }, 500, { total: "$100.000", note: "$20.000 las 100" }),
    ],
    notes: [],
  },
  etiquetas: {
    id: "etiquetas",
    name: "Etiquetas",
    category: "Etiquetas",
    description: "Papel terminación mate o brillante, hasta 250 gr.",
    variants: [
      { key: "size", label: "Tamaño", options: sizeChoices },
      { key: "quantity", label: "Cantidad", options: quantityChoices(100, 300, 500) },
    ],
    prices: paperPrices,
    notes: [],
  },
  folletos: {
    id: "folletos",
    name: "Folletos",
    category: "Folletos",
    description: "Papel ilustración, terminación brillante o matelina, hasta 120 gr.",
    variants: [
      { key: "format", label: "Medida", options: [{ value: "estandar", label: "Estándar 10 × 15 cm" }, { value: "chico", label: "Chico 7 × 10 cm" }] },
      { key: "side", label: "Impresión", options: [{ value: "simple", label: "Simple faz" }, { value: "doble", label: "Doble faz" }] },
      { key: "quantity", label: "Cantidad", options: quantityChoices(100, 300, 500) },
    ],
    prices: [
      price({ format: "estandar", side: "simple", quantity: "x100" }, 100, { total: "$18.000" }),
      price({ format: "estandar", side: "simple", quantity: "x300" }, 300, { total: "$48.000", note: "$16.000 los 100" }),
      price({ format: "estandar", side: "simple", quantity: "x500" }, 500, { total: "$75.000", note: "$15.000 los 100" }),
      price({ format: "estandar", side: "doble", quantity: "x100" }, 100, { total: "$25.000" }),
      price({ format: "estandar", side: "doble", quantity: "x300" }, 300, { total: "$66.000", note: "$22.000 los 100" }),
      price({ format: "estandar", side: "doble", quantity: "x500" }, 500, { total: "$100.000", note: "$20.000 los 100" }),
      price({ format: "chico", side: "simple", quantity: "x100" }, 100, { total: "$15.000" }),
      price({ format: "chico", side: "simple", quantity: "x300" }, 300, { total: "$42.000", note: "$14.000 los 100" }),
      price({ format: "chico", side: "simple", quantity: "x500" }, 500, { total: "$65.000", note: "$13.000 los 100" }),
      price({ format: "chico", side: "doble", quantity: "x100" }, 100, { total: "$21.000" }),
      price({ format: "chico", side: "doble", quantity: "x300" }, 300, { total: "$57.000", note: "$19.000 los 100" }),
      price({ format: "chico", side: "doble", quantity: "x500" }, 500, { total: "$90.000", note: "$18.000 los 100" }),
    ],
    notes: [],
  },
  "gorra-trucker": {
    id: "gorra-trucker",
    name: "Gorra Trucker",
    category: "Gorras",
    description: "Sublimada o con DTF.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 5, 10, 20, 30, 50) }],
    prices: [
      price({ quantity: "x1" }, 1, { total: "$10.000" }),
      price({ quantity: "x5" }, 5, { total: "$47.500", unitPrice: "$9.500" }),
      price({ quantity: "x10" }, 10, { total: "$90.000", unitPrice: "$9.000" }),
      price({ quantity: "x20" }, 20, { total: "$160.000", unitPrice: "$8.000" }),
      price({ quantity: "x30" }, 30, { total: "$225.000", unitPrice: "$7.500" }),
      price({ quantity: "x50" }, 50, { total: "$325.000", unitPrice: "$6.500" }),
    ],
    notes: [],
  },
  "taza-ceramica": {
    id: "taza-ceramica", name: "Taza cerámica", category: "Tazas", description: "Cerámica premium AAA sublimada.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 10, 30, 50) }],
    prices: [
      price({ quantity: "x1" }, 1, { total: "$15.000" }),
      price({ quantity: "x10" }, 10, { total: "$135.000", unitPrice: "$13.500" }),
      price({ quantity: "x30" }, 30, { total: "$375.000", unitPrice: "$12.500" }),
      price({ quantity: "x50" }, 50, { total: "$550.000", unitPrice: "$11.000" }),
    ], notes: [],
  },
  "taza-plastica": {
    id: "taza-plastica", name: "Taza plástica", category: "Tazas", description: "Plástico sublimado.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 10, 30) }],
    prices: [
      price({ quantity: "x1" }, 1, { total: "$9.000" }),
      price({ quantity: "x10" }, 10, { total: "$70.000", unitPrice: "$7.000" }),
      price({ quantity: "x30" }, 30, { total: "$120.000", unitPrice: "$4.000" }),
    ], notes: [],
  },
  "vinilo-sin-troquelar": {
    id: "vinilo-sin-troquelar", name: "Vinilo sin troquelar", category: "Vinilo", description: "Base blanca o transparente, sin troquelar.",
    variants: [{ key: "measure", label: "Medida", options: ["0,50 × 0,50 mt", "0,50 × 1 mt", "1 × 1 mt", "1 × 2 mt", "1 × 3 mt"].map((label, index) => ({ value: `m${index + 1}`, label })) }],
    prices: ["$10.000", "$20.000", "$38.000", "$70.000", "$105.000"].map((total, index) => price({ measure: `m${index + 1}` }, 1, { total })),
    notes: ["Incluye digitalización básica y texto o logo ya existente.", "El diseño personalizado se cotiza aparte."],
  },
  "vinilo-troquelado": {
    id: "vinilo-troquelado", name: "Vinilo troquelado", category: "Vinilo", description: "Base blanca o transparente, troquelado.",
    variants: [{ key: "measure", label: "Medida", options: ["0,50 × 0,50 mt", "0,50 × 1 mt", "1 × 1 mt", "1 × 2 mt"].map((label, index) => ({ value: `m${index + 1}`, label })) }],
    prices: ["$13.000", "$26.000", "$49.000", "$88.000"].map((total, index) => price({ measure: `m${index + 1}` }, 1, { total })),
    notes: ["Incluye digitalización básica y texto, diseño o logo ya existente.", "El diseño personalizado se cotiza aparte en vinilos chicos."],
  },
  "lona-front": {
    id: "lona-front", name: "Lona front", category: "Lona", description: "Precio sin terminación.",
    variants: [{ key: "measure", label: "Medida", options: ["0,50 × 0,50 mt", "0,50 × 1 mt", "1 × 1 mt", "1 × 2 mt", "1 × 3 mt"].map((label, index) => ({ value: `m${index + 1}`, label })) }],
    prices: ["$10.000", "$20.000", "$38.000", "$70.000", "$98.000"].map((total, index) => price({ measure: `m${index + 1}` }, 1, { total })),
    notes: ["Incluye digitalización básica y texto, diseño o logo ya existente.", "El diseño personalizado se cotiza aparte en lonas chicas.", "Ojalillos: $1.000 c/u.", "Fuelle: $3.000 por metro."],
  },
  "fly-banner-gota": {
    id: "fly-banner-gota", name: "Fly Banner forma gota", category: "Fly banners", description: "Altura 1,70 mt, tamaño mediano. Incluye estaca y diseño.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 2) }],
    prices: [price({ quantity: "x1" }, 1, { total: "$130.000" }), price({ quantity: "x2" }, 2, { total: "$250.000" })],
    notes: ["Consultar por otras formas o medidas."],
  },
  "portabanner-clasico": {
    id: "portabanner-clasico", name: "Portabanner de 2 tensores clásico", category: "Banners", description: "Tamaño estándar: 0,85 × 1,90 mt.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 2) }],
    prices: [price({ quantity: "x1" }, 1, { total: "$100.000" }), price({ quantity: "x2" }, 2, { total: "$185.000" })],
    notes: ["Consultar por otras medidas."],
  },
  "portabanner-roll-up": {
    id: "portabanner-roll-up", name: "Portabanner Roll-Up", category: "Banners", description: "Tamaño estándar: 0,85 × 1,90 mt.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 2) }],
    prices: [price({ quantity: "x1" }, 1, { total: "$120.000" }), price({ quantity: "x2" }, 2, { total: "$220.000" })],
    notes: ["Consultar por otras medidas."],
  },
  "remeras-infantiles": {
    id: "remeras-infantiles", name: "Remeras infantiles", category: "Remeras", description: "Algodón peinado 24.1.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 5, 10, 20, 50) }], sizes: ["Del 4 al 18"],
    prices: apparelPrices([[1, "$20.000"], [5, "$19.000"], [10, "$18.000"], [20, "$17.500"], [50, "$16.000"]]), notes: apparelNotes,
  },
  "remeras-adulto": {
    id: "remeras-adulto", name: "Remeras adulto", category: "Remeras", description: "Algodón peinado 24.1.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 5, 10, 20, 50) }], sizes: ["Del 1 al 10"],
    prices: apparelPrices([[1, "$25.000"], [5, "$24.000"], [10, "$23.000"], [20, "$22.000"], [50, "$20.000"]]), notes: apparelNotes,
  },
  "chomba-algodon": {
    id: "chomba-algodon", name: "Chomba algodón peinado 24.1", category: "Chombas", description: "Cuello polo y botones.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 5, 10) }], sizes: ["Del 1 al 5"],
    prices: apparelPrices([[1, "$30.000"], [5, "$28.500"], [10, "$27.000"]]), notes: [...apparelNotes, "Consultar por solo logo chico adelante."],
  },
  "chomba-pique": {
    id: "chomba-pique", name: "Chomba piqué", category: "Chombas", description: "Piqué de algodón, cuello polo y botones.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 5, 10) }], sizes: ["Del 1 al 10"],
    prices: apparelPrices([[1, "$35.000"], [5, "$33.000"], [10, "$31.500"]]), notes: [],
  },
  "canguro-infantil": {
    id: "canguro-infantil", name: "Canguro infantil", category: "Buzos", description: "Canguro de algodón, frisa clásica.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 5, 10) }], sizes: ["Del 4 al 18"],
    prices: apparelPrices([[1, "$35.000"], [5, "$34.000"], [10, "$31.000"]]), notes: apparelNotes,
  },
  "canguro-adulto": {
    id: "canguro-adulto", name: "Canguro adulto", category: "Buzos", description: "Canguro de algodón, frisa clásica.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 5, 10) }], sizes: ["Del 1 al 10"],
    prices: apparelPrices([[1, "$39.000"], [5, "$37.000"], [10, "$35.000"]]), notes: apparelNotes,
  },
  "canguro-premium": {
    id: "canguro-premium", name: "Canguro premium", category: "Buzos", description: "Frisa invisible, capucha forrada, ojales y cordón.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 5, 10) }],
    prices: apparelPrices([[1, "$45.000"], [5, "$43.000"], [10, "$40.000"]]), notes: apparelNotes,
  },
  "buzo-cuello-redondo": {
    id: "buzo-cuello-redondo", name: "Buzo cuello redondo", category: "Buzos", description: "Algodón, frisa clásica y cuello redondo.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 5, 10) }],
    prices: apparelPrices([[1, "$32.000"], [5, "$30.500"], [10, "$28.800"]]), notes: apparelNotes,
  },
  campera: {
    id: "campera", name: "Campera", category: "Buzos", description: "Algodón, frisa clásica, capucha, bolsillos y cierre.",
    variants: [{ key: "quantity", label: "Cantidad", options: quantityChoices(1, 5, 10) }],
    prices: apparelPrices([[1, "$45.000"], [5, "$43.000"], [10, "$40.000"]]), notes: apparelNotes,
  },
} as const satisfies Record<string, CatalogProduct>;

export type PriceCatalogId = keyof typeof priceCatalog;

export const resolveCatalogPrice = (
  catalogId: PriceCatalogId,
  selection: Record<string, string>,
): CatalogPrice | undefined => priceCatalog[catalogId].prices.find((entry) =>
  Object.entries(entry.selections).every(([key, value]) => selection[key] === value),
);

export const formatCatalogPrice = (entry?: CatalogPrice): string => {
  if (!entry) return "Consultar";
  if (entry.total) return entry.total;
  if (entry.unitPrice) return `${entry.unitPrice} c/u`;
  return "Consultar";
};
