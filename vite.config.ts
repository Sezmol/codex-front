import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          secure: false,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      tailwindcss(),
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
        components: `${path.resolve(__dirname, "./src/components/")}`,
        pages: `${path.resolve(__dirname, "./src/pages/")}`,
      },
    },
  };
});
