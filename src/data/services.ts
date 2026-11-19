// Textos compartidos entre Servicios y las fichas de producto.
export const serviceDescriptions = {
  estampadoTextil: [
    "En nuestro taller utilizamos varias técnicas de estampado: sublimado, vinilo textil, DTF y bordado, según cada proyecto.",
    "La que más utilizamos hoy en día en estampado de prendas es DTF, por su versatilidad en cuanto a diseño (no tiene limitaciones), su calidad de impresión y definición, y porque sirve para prácticamente todas las telas.",
    "En los packs de remeras, buzos y camperas pueden encontrar como ejemplo el uso estándar: logo chico adelante a un costado del pecho y media espalda. Pero estampamos en la medida que tu proyecto necesite; podés comunicarte y cotizamos según tu necesidad.",
  ],
  calcosVinilo: [
    "Pueden ser base color, transparentes u holográficas.",
    "Cortadas cuadradas, rectangulares, circulares o con la forma que quieras.",
    "En los packs aparecen medidas estándar, las más usadas, pero imprimimos en la medida que tu proyecto necesite.",
    "Son aptas para interior y exterior, impresas con tintas ecosolventes, colores vibrantes y resistentes al agua.",
    "Se pueden usar en vidrieras, vehículos, cartelería, packaging, objetos y diferentes superficies.",
  ],
  calcosPapel: [
    "Una opción práctica y más económica para aplicaciones de interior.",
    "Impresas con tintas al agua. Pueden ser cortadas cuadradas o rectangulares, con una medida máxima de 20 × 30 cm. No son resistentes al agua.",
    "Ideales para etiquetas, packaging, productos, sobres, bolsas y diferentes piezas de comunicación.",
  ],
  calcosDtfUv: [
    "Impresión UV de alta resolución con colores intensos y excelente definición. Se aplican mediante transferencia sobre superficies lisas y rígidas como vasos, botellas, acrílico, vidrio, plástico, madera y otros materiales.",
    "Su terminación premium tiene efecto de tinta en relieve y es brillante.",
    "Se puede imprimir sin fondo.",
    "Excelente durabilidad en exterior y resistencia a rayones.",
    "En los packs aparecen medidas estándar, pero podemos imprimir en la medida que tu proyecto necesite, en un ancho máximo de 58 cm.",
  ],
  tarjetas: [
    "Medida estándar: 8,5 × 5,5 cm.",
    "Pueden ser simple o doble faz.",
    "Terminación mate (sin brillo) o brillante.",
    "Ideales para profesionales, comercios y emprendimientos.",
    "Podemos realizarlas en medidas especiales según cada proyecto, consultanos.",
  ],
  folletos: [
    "Medida estándar: 10 × 15 cm.",
    "Papel ilustración de 120 g.",
    "Simple o doble faz.",
  ],
  gorras: [
    "Frente de neoprene apto para personalización.",
    "Panel trasero de red respirable, trabajamos todos los colores.",
    "Cierre regulable.",
    "Diseño cómodo y moderno.",
    "Ideal para uso promocional, comercial y personal.",
  ],
} as const;

export const serviceDetails = [
  { name: "Estampado textil", paragraphs: serviceDescriptions.estampadoTextil, href: "/productos/remera-unisex/", linkLabel: "Ver packs de prendas" },
  { name: "Calcos de vinilo impreso", paragraphs: serviceDescriptions.calcosVinilo, href: "/productos/calcos-vinilo/", linkLabel: "Ver packs de calcos de vinilo" },
  { name: "Calcos de papel", paragraphs: serviceDescriptions.calcosPapel, href: "/productos/calcos-papel/", linkLabel: "Ver packs de calcos de papel" },
  { name: "Calcos DTF UV", paragraphs: serviceDescriptions.calcosDtfUv, href: "/productos/calcos-dtf-uv/", linkLabel: "Ver packs de calcos DTF UV" },
  { name: "Tarjetas", paragraphs: serviceDescriptions.tarjetas, href: "/productos/tarjetas-personales/", linkLabel: "Ver packs de tarjetas" },
  { name: "Folletos", paragraphs: serviceDescriptions.folletos, href: "/productos/folletos/", linkLabel: "Ver packs de folletos" },
  { name: "Gorras trucker", paragraphs: serviceDescriptions.gorras, href: "/productos/gorra-trucker/", linkLabel: "Ver packs de gorras" },
];
