const normalizePhone = (value: string) => value.replace(/\D/g, "");

const whatsappNumber = normalizePhone(
  import.meta.env.PUBLIC_WHATSAPP_NUMBER || "5493431234567",
);

export const siteConfig = {
  name: "Química Estampados",
  description: "Estampados, impresión textil y soluciones gráficas para marcas.",
  email: "quimicaestampados@gmail.com",
  address: {
    street: "Alem 65",
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
    label: "<Binadevs/>",
    url: import.meta.env.PUBLIC_DEVELOPER_URL || "https://binadevs.com/",
  },
  contactFormEndpoint: import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT || "",
} as const;

export const fullAddress = [
  siteConfig.address.street,
  siteConfig.address.city,
  siteConfig.address.province,
].join(", ");

// Mapa embebido centrado en el local de Química Estampados.
export const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d420.0602092917048!2d-60.15701844907793!3d-32.619994070106!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6c3005d342925%3A0x42120c707aa2add6!2sQu%C3%ADmica%20Estampados!5e0!3m2!1ses-419!2sus!4v1791585460718!5m2!1ses-419!2sus";

export const serviceConsultationMessages = {
  corporeos: "¡Hola! Vi los corpóreos en polifan en la web de Química Estampados y me gustaría pedir un presupuesto para un logo o letras personalizadas. ¿Qué información necesitan para cotizar las medidas, la cantidad y la terminación?",
  granFormato: "¡Hola! Vi el servicio de impresión de gran formato en la web de Química Estampados y quisiera pedir un presupuesto. ¿Me pueden asesorar sobre el material adecuado para mi proyecto y qué medidas y datos necesitan para cotizarlo?",
} as const;

export const whatsappUrl = (message = "Hola, vengo desde la web de Química Estampados. Quisiera consultar por estampados y productos personalizados.") => {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
