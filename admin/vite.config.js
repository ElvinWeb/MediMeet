import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
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
            "prop-types",
            "react-toastify",
            "react-loading-skeleton",
          ],
        },
      },
    },
    minify: "esbuild",
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
      "react-hook-form",
      "recharts",
      "axios",
      "dayjs",
      "yup",
    ],
    exclude: ["@vite/client", "@vite/env"],
  },
});
