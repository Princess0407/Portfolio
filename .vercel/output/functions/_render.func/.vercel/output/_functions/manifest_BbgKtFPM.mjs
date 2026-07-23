import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CmUKXSxO.mjs';
import 'es-module-lexer';
import { i as decodeKey } from './chunks/astro/server_Cy5xtb3k.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/princess/Downloads/princess-portfolio/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"api/github","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/github","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/github\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"github","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/github.ts","pathname":"/api/github","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"blog/gxu-1/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog/gxu-1","isIndex":false,"type":"page","pattern":"^\\/blog\\/gxu-1\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"gxu-1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/gxu-1.md","pathname":"/blog/gxu-1","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"gallery/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/gallery","isIndex":false,"type":"page","pattern":"^\\/gallery\\/?$","segments":[[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gallery.astro","pathname":"/gallery","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"poems/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/poems","isIndex":false,"type":"page","pattern":"^\\/poems\\/?$","segments":[[{"content":"poems","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/poems.astro","pathname":"/poems","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"reach/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/reach","isIndex":false,"type":"page","pattern":"^\\/reach\\/?$","segments":[[{"content":"reach","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/reach.astro","pathname":"/reach","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/reach","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/reach\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"reach","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/reach.ts","pathname":"/api/reach","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/princess/Downloads/princess-portfolio/src/pages/blog/gxu-1.md",{"propagation":"none","containsHead":true}],["/home/princess/Downloads/princess-portfolio/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["/home/princess/Downloads/princess-portfolio/src/pages/gallery.astro",{"propagation":"none","containsHead":true}],["/home/princess/Downloads/princess-portfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/princess/Downloads/princess-portfolio/src/pages/poems.astro",{"propagation":"none","containsHead":true}],["/home/princess/Downloads/princess-portfolio/src/pages/reach.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astro-page:src/pages/blog/gxu-1@_@md":"pages/blog/gxu-1.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/api/github@_@ts":"pages/api/github.astro.mjs","\u0000@astro-page:src/pages/api/reach@_@ts":"pages/api/reach.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/gallery@_@astro":"pages/gallery.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/poems@_@astro":"pages/poems.astro.mjs","\u0000@astro-page:src/pages/reach@_@astro":"pages/reach.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/home/princess/Downloads/princess-portfolio/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_BbgKtFPM.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BXSxhDNK.js","/astro/hoisted.js?q=1":"_astro/hoisted.CZUhFEee.js","/astro/hoisted.js?q=2":"_astro/hoisted.CutwV_Nv.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/gxu-1.CEb1Z6uz.css","/_astro/index.DegTSAMy.css","/Resume-3.pdf","/icon.svg","/_astro/hoisted.BXSxhDNK.js","/_astro/hoisted.CZUhFEee.js","/_astro/hoisted.CutwV_Nv.js","/banners/dark.png","/banners/light.png","/gallery/20240527_164200.jpg","/gallery/20240926_174911.jpg","/gallery/20241205_172129.jpg","/gallery/20250517_183418.jpg","/gallery/20250727_183109.jpg","/gallery/20250804_182238.jpg","/gallery/20251124_174221.jpg","/gallery/IMG-20240423-WA0040.jpg","/gallery/IMG-20260714-WA0083.jpg","/api/github","/blog/gxu-1/index.html","/blog/index.html","/gallery/index.html","/poems/index.html","/reach/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"gTtuvbrcZ2VtObQDIUn2nlL+fAsMMBaUsiwmTIvgDMQ=","experimentalEnvGetSecretEnabled":false});

export { manifest };
