import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@context": resolve(__dirname, "src/context"),
      "@data": resolve(__dirname, "src/data"),
      "@styles": resolve(__dirname, "src/styles"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@assets": resolve(__dirname, "src/assets"),
      "@types": resolve(__dirname, "src/types"),
      "@appTypes": resolve(__dirname, "src/types")
    }
  }
});
