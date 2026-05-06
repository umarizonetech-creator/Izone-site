import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    target: "esnext",          // modern JS for smaller/faster output
    sourcemap: false,          // remove debug info for smaller bundle
    cssCodeSplit: true,        // split CSS per component/page
    chunkSizeWarningLimit: 600, // warn if chunks exceed 600 KB
  },

  esbuild: {
    drop: ["console", "debugger"], // remove console/debugger in prod
  },
});
