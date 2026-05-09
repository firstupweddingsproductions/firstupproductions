import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Production domain — used for canonical, og:url, sitemap, robots.
// Change this if the final domain differs from firstupproductions.de.
export default defineConfig({
  site: 'https://firstupproductions.de',
  integrations: [tailwind({
    applyBaseStyles: false,
    configFile: path.resolve(__dirname, 'tailwind.config.mjs'),
  })],
  server: { port: 4321 },
});
