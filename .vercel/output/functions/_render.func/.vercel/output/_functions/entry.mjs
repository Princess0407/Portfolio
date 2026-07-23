import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_C4gf0UHG.mjs';
import { manifest } from './manifest_BbgKtFPM.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/github.astro.mjs');
const _page2 = () => import('./pages/api/reach.astro.mjs');
const _page3 = () => import('./pages/blog/gxu-1.astro.mjs');
const _page4 = () => import('./pages/blog.astro.mjs');
const _page5 = () => import('./pages/gallery.astro.mjs');
const _page6 = () => import('./pages/poems.astro.mjs');
const _page7 = () => import('./pages/reach.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/github.ts", _page1],
    ["src/pages/api/reach.ts", _page2],
    ["src/pages/blog/gxu-1.md", _page3],
    ["src/pages/blog/index.astro", _page4],
    ["src/pages/gallery.astro", _page5],
    ["src/pages/poems.astro", _page6],
    ["src/pages/reach.astro", _page7],
    ["src/pages/index.astro", _page8]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "02c65117-dc7f-4691-a3d3-52760e3bb0f7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
