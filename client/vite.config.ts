
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  // @ts-ignore
  server: { https: true, host: '127.0.0.1', }, // Not needed for Vite 5+
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
