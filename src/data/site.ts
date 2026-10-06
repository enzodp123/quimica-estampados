const normalizePhone = (value: string) => value.replace(/\D/g, "");

const whatsappNumber = normalizePhone(
  import.meta.env.PUBLIC_WHATSAPP_NUMBER || "5493431234567",
);

export const siteConfig = {
  name: "Química Estampados",
  description: "Estampados, impresión textil y soluciones gráficas para marcas.",
  email: "quimicaestampados@gmail.com",
  address: {
    street: "65 Alem",
    city: "Victoria",
    province: "Entre Ríos",
    country: "Argentina",
  },
  whatsapp: {
    number: whatsappNumber,
    display: import.meta.env.PUBLIC_WHATSAPP_DISPLAY || "+54 9 343 123 4567",
  },
  social: {
    instagram:
      import.meta.env.PUBLIC_INSTAGRAM_URL ||
      "https://www.instagram.com/quimicaestampados.ok/",
    facebook:
      import.meta.env.PUBLIC_FACEBOOK_URL ||
      "https://www.facebook.com/quimicaestampados/?locale=es_LA",
  },
  developer: {
    label: "@binadevs",
    url: import.meta.env.PUBLIC_DEVELOPER_URL || "",
  },
  contactFormEndpoint: import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT || "",
} as const;

export const fullAddress = [
  siteConfig.address.street,
  siteConfig.address.city,
  siteConfig.address.province,
].join(", ");

// URL de Google Maps confirmada para el mapa embebido del formulario.
export const mapEmbedUrl = "https://www.google.com/maps?ll=-32.620068,-60.157082&z=16&t=m&hl=es-ES&gl=US&mapclient=embed&q=Alem+65+E3153+Victoria+Entre+R%C3%ADos";

export const serviceConsultationMessages = {
  corporeos: "¡Hola! Vi los corpóreos en polifan en la web de Química Estampados y me gustaría pedir un presupuesto para un logo o letras personalizadas. ¿Qué información necesitan para cotizar las medidas, la cantidad y la terminación?",
  granFormato: "¡Hola! Vi el servicio de impresión de gran formato en la web de Química Estampados y quisiera pedir un presupuesto. ¿Me pueden asesorar sobre el material adecuado para mi proyecto y qué medidas y datos necesitan para cotizarlo?",
} as const;

export const whatsappUrl = (message = "Hola, vengo desde la web de Química Estampados. Quisiera consultar por estampados y productos personalizados.") => {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
