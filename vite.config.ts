import { crx, ManifestV3Export } from "@crxjs/vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { defineConfig } from "vite"

import devManifest from "./manifest.dev.json"
import firefoxManifest from "./manifest.firefox.json"
import manifest from "./manifest.json"

import pkg from "./package.json"
import { stripDevIcons } from "./vite/plugins/stripDevIcons"

const root = resolve(__dirname, "src")
const pagesDir = resolve(root, "pages")
const assetsDir = resolve(root, "assets")
const outDir = resolve(__dirname, "dist")
const publicDir = resolve(__dirname, "public")

const isDev = process.env.__DEV__ === "true"
const isFirefox = process.env.BROWSER === "firefox"

const extensionManifest = {
    ...manifest,
    ...(isDev ? devManifest : ({} as ManifestV3Export)),
    ...(isFirefox ? firefoxManifest : ({} as ManifestV3Export)),
    name: isDev ? `DEV: ${manifest.name}` : manifest.name,
    version: pkg.version,
}

export default defineConfig({
    resolve: {
        alias: {
            "@src": root,
            "@assets": assetsDir,
            "@pages": pagesDir,
        },
    },
    plugins: [
        crx({
            manifest: extensionManifest as ManifestV3Export,
            contentScripts: {
                injectCss: true,
            },
        }),
        stripDevIcons(isDev),
        react(),
    ],
    publicDir,
    build: {
        minify: "esbuild",
        outDir,
        sourcemap: isDev ? "inline" : false,
        emptyOutDir: !isDev,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom"],
                },
            },
        },
        target: "esnext",
    },
})
