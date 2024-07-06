import { crx, ManifestV3Export } from "@crxjs/vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { defineConfig } from "vite"

import devManifest from "./manifest.dev.json"
import manifest from "./manifest.json"
import pkg from "./package.json"
import { stripDevIcons } from "./vite/plugins/stripDevIcons"
import { viteManifestHackIssue846 } from "./vite/plugins/viteManifestHackIssue846"

const root = resolve(__dirname, "src")
const pagesDir = resolve(root, "pages")
const assetsDir = resolve(root, "assets")
const outDir = resolve(__dirname, "dist")
const publicDir = resolve(__dirname, "public")

const isDev = process.env.__DEV__ === "true"

const extensionManifest = {
    ...manifest,
    ...(isDev ? devManifest : ({} as ManifestV3Export)),
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
        viteManifestHackIssue846,
        stripDevIcons(isDev),
        react(),
        crx({
            manifest: extensionManifest as ManifestV3Export,
            contentScripts: {
                injectCss: true,
            },
        }),
    ],
    publicDir,
    build: {
        outDir,
        sourcemap: isDev ? "inline" : false,
        emptyOutDir: !isDev,
    },
})
