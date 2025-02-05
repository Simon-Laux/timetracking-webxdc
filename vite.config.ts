import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { buildXDC, mockWebxdc } from "@webxdc/vite-plugins";

//@ts-ignore
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    buildXDC({
      outFileName:
        (packageJson.name || "app") +
        "_" +
        (packageJson.version || "") +
        ".xdc",
      outDir: "dist-zip",
    }) /* mockWebxdc() because it doesn't currently work with hash based routing */,
  ],
  build: { chunkSizeWarningLimit: 600 },
});
