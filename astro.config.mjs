import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://pirayeah.github.io',
  base: '/piraye-personal-site',
  build: { format: 'directory' },
});
