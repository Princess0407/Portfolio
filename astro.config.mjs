import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  integrations: [mdx()],
  server: {
    host: true,
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
      wrap: true
    }
  }
});
