
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
    build: {
        outDir: "dist",
        emptyOutDir: true,

        rollupOptions: {
            input: {
                background: resolve(__dirname, "src/background.ts"),
                content: resolve(__dirname, "src/content.ts")
            },

            output: {
                format: "iife",
                entryFileNames: "[name].js"
            }
        }
    }
});
