/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_PAT: string;
  readonly SMTP_HOST: string;
  readonly SMTP_PORT: string;
  readonly SMTP_USER: string;
  readonly SMTP_PASS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
