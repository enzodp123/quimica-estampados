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

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

export const whatsappUrl = (message = "Hola, vengo desde la web de Química Estampados. Quisiera consultar por estampados y productos personalizados.") => {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
