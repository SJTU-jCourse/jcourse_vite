import react from "@vitejs/plugin-react";
import { URL, fileURLToPath } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
  server: {
    proxy: {
      "/api": "https://course.sjtu.plus",
      "/oauth": "https://course.sjtu.plus",
    },
  },
});
