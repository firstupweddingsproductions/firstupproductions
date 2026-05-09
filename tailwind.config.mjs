import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('tailwindcss').Config} */
export default {
  content: [path.join(__dirname, 'src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}')],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          dark: '#1A1A1A',
          gray: '#2A2A2A',
          muted: '#888888',
          light: '#F5F5F3',
          white: '#FFFFFF',
          accent: '#C9A96E',
          'accent-hover': '#D4B97E',
        },
      },
      fontFamily: {
        heading: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
