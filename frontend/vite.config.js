import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      treeshake: {
        preset: "recommended",
        moduleSideEffects: false,
      },
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          forms: ["react-hook-form", "@hookform/resolvers", "yup"],
          utils: [
            "axios",
            "jwt-decode",
            "react-toastify",
            "react-helmet-async",
            "react-loading-skeleton",
          ],
        },
      },
    },
    minify: 'esbuild',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
      },
    },
    sourcemap: false,
    target: "esnext",
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "axios",
      "dayjs",
      "react-hook-form",
      "yup",
    ],
    exclude: ["@vite/client", "@vite/env"],
  },
});
