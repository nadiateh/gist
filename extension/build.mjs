
import { build } from "esbuild";
import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });

await mkdir("dist", { recursive: true });

await build({
    entryPoints: [
        "src/background.ts",
        "src/content.ts"
    ],
    bundle: true,
    outdir: "dist",
    entryNames: "[name]",
    format: "iife",
    platform: "browser",
    target: "chrome120"
});

await cp("public/manifest.json", "dist/manifest.json");

console.log("Gist extension built successfully!");
