/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BAIDU_TONGJI_CODE: string; // 百度统计代码
  readonly VITE_CONTACT_EMAIL: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
