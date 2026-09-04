// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
      include: {
        lucide: [
          'badge-check',
          'truck',
          'layers-3',
          'layers',
          'headphones',
          'headset',
          'store',
          'file-text',
          'pen-line',
          'sliders-horizontal',
          'package',
          'mail',
          'message-circle',
          'share-2',
          'external-link',
          'quote',
          'circle-user-round',
        ],
      },
    }),
  ],
  devToolbar: {
    enabled: false
  }
});
