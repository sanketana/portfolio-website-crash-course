// [PASTE · step 1] Where the site will live on GitHub Pages — ask: why does the address end in the repo name?
import { defineConfig } from 'astro/config';
// [PASTE · step 8] Teach Astro to render React components — ask: does this add JavaScript to every page?
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://YOUR-GITHUB-USERNAME.github.io',
  base: '/portfolio/',
  // [PASTE · step 8] Switch the React integration on
  integrations: [react()],
});
