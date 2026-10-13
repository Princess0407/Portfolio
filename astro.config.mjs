import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  integrations: [mdx(), tailwind()],
  redirects: {
    '/blog': '/writing',
    '/blog/gxu-1': '/writing/gxu-1',
  },
  server: {
    host: true,
    port: 4321,
  },
  // Cursor Cloud Agent port links use *.agent.cvm.dev; Vite rejects unknown Host headers with 403.
  vite: {
    server: {
      allowedHosts: ['.agent.cvm.dev'],
    },
    preview: {
      allowedHosts: ['.agent.cvm.dev'],
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
