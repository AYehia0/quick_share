import path from "path";
import { defineConfig } from "vite";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

function generateManifest() {
  const manifest = readJsonFile("manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

function root(...paths: string[]): string {
  return path.resolve(__dirname, ...paths);
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: root("dist"),
    emptyOutDir: true,
  },
  plugins: [
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ["package.json", "manifest.json"],
    }),
  ],
});
