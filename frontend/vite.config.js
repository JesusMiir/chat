import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": "http://localhost:8800",
      "/ping": "http://localhost:8800",

      "/ws": {
        target: "ws://localhost:8800",
        ws: true,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
