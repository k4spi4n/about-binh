import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/

// We are using path.resolve(".", "./src") instead of path.resolve(__dirname, "./src")
// because __dirname is not available in Vite's config file by default.

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/about-binh/",
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(".", "./src"),
    },
  },
});
