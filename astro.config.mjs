// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://escotech.robgreen.work',
  markdown: {
    // Preserve literal '--' (no em-dash smartypants conversion)
    smartypants: false,
  },
});
