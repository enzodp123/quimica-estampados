// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
      include: {
        lucide: ['badge-check', 'truck', 'layers-3', 'headphones', 'store'],
      },
    }),
  ],
  devToolbar: {
    enabled: false
  }
});
