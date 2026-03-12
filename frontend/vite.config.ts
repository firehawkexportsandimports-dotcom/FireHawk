import { defineConfig } from "vite";
import reactSWC from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [reactSWC()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },

  build: {
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {

            if (id.includes("react")) {
              return "vendor-react";
            }

            if (id.includes("@radix-ui")) {
              return "vendor-radix";
            }

            if (id.includes("react-router")) {
              return "vendor-router";
            }

            if (id.includes("@tanstack")) {
              return "vendor-query";
            }

            return "vendor-ui";
          }

          if (id.includes("/pages/admin/")) {
            return "admin";
          }
        },
      },
    },
  },
});