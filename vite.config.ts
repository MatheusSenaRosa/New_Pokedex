import * as path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@animations": path.resolve(__dirname, "src/styles/animations"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@interfaces": path.resolve(__dirname, "src/shared/interfaces"),
      "@utils": path.resolve(__dirname, "src/shared/utils"),
      "@services": path.resolve(__dirname, "src/shared/services"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
});
