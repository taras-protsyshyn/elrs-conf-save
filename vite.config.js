import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: "src/main.jsx",
      userscript: {
        namespace: "npm/vite-plugin-monkey",
        match: ["http://127.0.0.1:5500"],
      },
    }),
  ],
});
