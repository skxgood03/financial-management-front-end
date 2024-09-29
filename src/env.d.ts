/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VUE_APP_BASE_API: string;
  // 这里可以添加更多你需要的环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
