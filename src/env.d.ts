/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CONTACT_FORM_ENDPOINT?: string;
  readonly PUBLIC_WHATSAPP_NUMBER?: string;
  readonly PUBLIC_WHATSAPP_DISPLAY?: string;
  readonly PUBLIC_INSTAGRAM_URL?: string;
  readonly PUBLIC_FACEBOOK_URL?: string;
  readonly PUBLIC_DEVELOPER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
