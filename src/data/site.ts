const normalizePhone = (value: string) => value.replace(/\D/g, "");

const whatsappNumber = normalizePhone(
  import.meta.env.PUBLIC_WHATSAPP_NUMBER || "5491126249300",
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
    display: import.meta.env.PUBLIC_WHATSAPP_DISPLAY || "+54 9 11 2624-9300",
  },
  social: {
    instagram: import.meta.env.PUBLIC_INSTAGRAM_URL || "",
    facebook: import.meta.env.PUBLIC_FACEBOOK_URL || "",
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

export const whatsappUrl = (message?: string) => {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
