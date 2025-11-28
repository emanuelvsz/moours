import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@dicontainer": path.resolve(__dirname, "src/dicontainer"),
      "@web": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "../../core"),
      "@infra": path.resolve(__dirname, "../../infra")
    }
  }
});
