// vite.config.ts
import react from "file:///C:/Users/alexe/vscode/extensions/better-studres-v2-main/node_modules/@vitejs/plugin-react-swc/index.mjs"
import { resolve } from "path"
import fs from "fs"
import { defineConfig } from "file:///C:/Users/alexe/vscode/extensions/better-studres-v2-main/node_modules/vite/dist/node/index.js"
import { crx } from "file:///C:/Users/alexe/vscode/extensions/better-studres-v2-main/node_modules/@crxjs/vite-plugin/dist/index.mjs"

// manifest.json
var manifest_default = {
    manifest_version: 3,
    name: "Better Studres",
    description: "This is an extension to improve studres appearence.",
    action: {
        default_popup: "src/pages/popup/index.html",
        default_icon: {
            32: "icon-32.png",
        },
    },
    icons: {
        128: "icon-128.png",
    },
    permissions: ["storage"],
    content_scripts: [
        {
            matches: ["https://studres.cs.st-andrews.ac.uk/*"],
            js: ["src/pages/content/index.tsx"],
            css: ["contentStyle.css"],
        },
    ],
    web_accessible_resources: [
        {
            resources: ["contentStyle.css", "icon-128.png", "icon-32.png"],
            matches: [],
        },
    ],
}

// manifest.dev.json
var manifest_dev_default = {
    action: {
        default_icon: "public/dev-icon-32.png",
        default_popup: "src/pages/popup/index.html",
    },
    icons: {
        128: "public/dev-icon-128.png",
    },
    web_accessible_resources: [
        {
            resources: [
                "contentStyle.css",
                "dev-icon-128.png",
                "dev-icon-32.png",
            ],
            matches: [],
        },
    ],
}

// package.json
var package_default = {
    name: "vite-web-extension",
    version: "2.0",
    description:
        "A simple chrome extension template with Vite, React, TypeScript and Tailwind CSS.",
    license: "MIT",
    repository: {
        type: "git",
        url: "https://github.com/Herobread/better-studres-v2",
    },
    scripts: {
        build: "vite build",
        dev: "nodemon",
        format: "yarn prettier . --write",
    },
    type: "module",
    dependencies: {
        "@radix-ui/react-slot": "^1.0.2",
        "class-variance-authority": "^0.7.0",
        clsx: "^2.1.0",
        "lucide-react": "^0.365.0",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "tailwind-merge": "^2.2.2",
        "tailwindcss-animate": "^1.0.7",
        "webextension-polyfill": "^0.10.0",
    },
    devDependencies: {
        "@crxjs/vite-plugin": "^1.0.14",
        "@types/chrome": "^0.0.253",
        "@types/node": "^18.17.1",
        "@types/react": "^18.2.39",
        "@types/react-dom": "^18.2.17",
        "@types/webextension-polyfill": "^0.10.0",
        "@typescript-eslint/eslint-plugin": "^5.49.0",
        "@typescript-eslint/parser": "^5.49.0",
        "@vitejs/plugin-react-swc": "^3.0.1",
        autoprefixer: "^10.4.16",
        eslint: "^8.32.0",
        "eslint-config-prettier": "^8.6.0",
        "eslint-plugin-import": "^2.27.5",
        "eslint-plugin-jsx-a11y": "^6.7.1",
        "eslint-plugin-react": "^7.32.1",
        "eslint-plugin-react-hooks": "^4.3.0",
        "fs-extra": "^11.1.0",
        nodemon: "^2.0.20",
        postcss: "^8.4.31",
        prettier: "3.2.5",
        tailwindcss: "^3.3.5",
        "ts-node": "^10.9.1",
        typescript: "^4.9.4",
        vite: "^4.5.0",
    },
}

// vite.config.ts
var __vite_injected_original_dirname =
    "C:\\Users\\alexe\\vscode\\extensions\\better-studres-v2-main"
var root = resolve(__vite_injected_original_dirname, "src")
var pagesDir = resolve(root, "pages")
var assetsDir = resolve(root, "assets")
var outDir = resolve(__vite_injected_original_dirname, "dist")
var publicDir = resolve(__vite_injected_original_dirname, "public")
var isDev = process.env.__DEV__ === "true"
var extensionManifest = {
    ...manifest_default,
    ...(isDev ? manifest_dev_default : {}),
    name: isDev ? `DEV: ${manifest_default.name}` : manifest_default.name,
    version: package_default.version,
}
function stripDevIcons(apply) {
    if (apply) return null
    return {
        name: "strip-dev-icons",
        resolveId(source) {
            return source === "virtual-module" ? source : null
        },
        renderStart(outputOptions, inputOptions) {
            const outDir2 = outputOptions.dir
            fs.rm(resolve(outDir2, "dev-icon-32.png"), () =>
                console.log(`Deleted dev-icon-32.png frm prod build`),
            )
            fs.rm(resolve(outDir2, "dev-icon-128.png"), () =>
                console.log(`Deleted dev-icon-128.png frm prod build`),
            )
        },
    }
}
var vite_config_default = defineConfig({
    resolve: {
        alias: {
            "@src": root,
            "@assets": assetsDir,
            "@pages": pagesDir,
        },
    },
    plugins: [
        react(),
        crx({
            manifest: extensionManifest,
            contentScripts: {
                injectCss: true,
            },
        }),
        stripDevIcons(isDev),
    ],
    publicDir,
    build: {
        outDir,
        sourcemap: isDev,
        emptyOutDir: !isDev,
    },
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4ZVxcXFx2c2NvZGVcXFxcZXh0ZW5zaW9uc1xcXFxiZXR0ZXItc3R1ZHJlcy12Mi1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4ZVxcXFx2c2NvZGVcXFxcZXh0ZW5zaW9uc1xcXFxiZXR0ZXItc3R1ZHJlcy12Mi1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbGV4ZS92c2NvZGUvZXh0ZW5zaW9ucy9iZXR0ZXItc3R1ZHJlcy12Mi1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIlxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHsgY3J4LCBNYW5pZmVzdFYzRXhwb3J0IH0gZnJvbSBcIkBjcnhqcy92aXRlLXBsdWdpblwiXG5cbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5qc29uXCJcbmltcG9ydCBkZXZNYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5kZXYuanNvblwiXG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiXG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIilcbmNvbnN0IHBhZ2VzRGlyID0gcmVzb2x2ZShyb290LCBcInBhZ2VzXCIpXG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsIFwiYXNzZXRzXCIpXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpXG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJwdWJsaWNcIilcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIlxuXG5jb25zdCBleHRlbnNpb25NYW5pZmVzdCA9IHtcbiAgICAuLi5tYW5pZmVzdCxcbiAgICAuLi4oaXNEZXYgPyBkZXZNYW5pZmVzdCA6ICh7fSBhcyBNYW5pZmVzdFYzRXhwb3J0KSksXG4gICAgbmFtZTogaXNEZXYgPyBgREVWOiAke21hbmlmZXN0Lm5hbWV9YCA6IG1hbmlmZXN0Lm5hbWUsXG4gICAgdmVyc2lvbjogcGtnLnZlcnNpb24sXG59XG5cbi8vIHBsdWdpbiB0byByZW1vdmUgZGV2IGljb25zIGZyb20gcHJvZCBidWlsZFxuZnVuY3Rpb24gc3RyaXBEZXZJY29ucyhhcHBseTogYm9vbGVhbikge1xuICAgIGlmIChhcHBseSkgcmV0dXJuIG51bGxcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IFwic3RyaXAtZGV2LWljb25zXCIsXG4gICAgICAgIHJlc29sdmVJZChzb3VyY2U6IHN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZSA9PT0gXCJ2aXJ0dWFsLW1vZHVsZVwiID8gc291cmNlIDogbnVsbFxuICAgICAgICB9LFxuICAgICAgICByZW5kZXJTdGFydChvdXRwdXRPcHRpb25zOiBhbnksIGlucHV0T3B0aW9uczogYW55KSB7XG4gICAgICAgICAgICBjb25zdCBvdXREaXIgPSBvdXRwdXRPcHRpb25zLmRpclxuICAgICAgICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMzIucG5nXCIpLCAoKSA9PlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTMyLnBuZyBmcm0gcHJvZCBidWlsZGApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMTI4LnBuZ1wiKSwgKCkgPT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBkZXYtaWNvbi0xMjgucG5nIGZybSBwcm9kIGJ1aWxkYCksXG4gICAgICAgICAgICApXG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgIFwiQHNyY1wiOiByb290LFxuICAgICAgICAgICAgXCJAYXNzZXRzXCI6IGFzc2V0c0RpcixcbiAgICAgICAgICAgIFwiQHBhZ2VzXCI6IHBhZ2VzRGlyLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgICAgICBjcngoe1xuICAgICAgICAgICAgbWFuaWZlc3Q6IGV4dGVuc2lvbk1hbmlmZXN0IGFzIE1hbmlmZXN0VjNFeHBvcnQsXG4gICAgICAgICAgICBjb250ZW50U2NyaXB0czoge1xuICAgICAgICAgICAgICAgIGluamVjdENzczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgICBzdHJpcERldkljb25zKGlzRGV2KSxcbiAgICBdLFxuICAgIHB1YmxpY0RpcixcbiAgICBidWlsZDoge1xuICAgICAgICBvdXREaXIsXG4gICAgICAgIHNvdXJjZW1hcDogaXNEZXYsXG4gICAgICAgIGVtcHR5T3V0RGlyOiAhaXNEZXYsXG4gICAgfSxcbn0pXG4iLCAie1xuICAgIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxuICAgIFwibmFtZVwiOiBcIkJldHRlciBTdHVkcmVzXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoaXMgaXMgYW4gZXh0ZW5zaW9uIHRvIGltcHJvdmUgc3R1ZHJlcyBhcHBlYXJlbmNlLlwiLFxuICAgIFwiYWN0aW9uXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcbiAgICAgICAgXCJkZWZhdWx0X2ljb25cIjoge1xuICAgICAgICAgICAgXCIzMlwiOiBcImljb24tMzIucG5nXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJpY29uc1wiOiB7XG4gICAgICAgIFwiMTI4XCI6IFwiaWNvbi0xMjgucG5nXCJcbiAgICB9LFxuICAgIFwicGVybWlzc2lvbnNcIjogW1wic3RvcmFnZVwiXSxcbiAgICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwibWF0Y2hlc1wiOiBbXCJodHRwczovL3N0dWRyZXMuY3Muc3QtYW5kcmV3cy5hYy51ay8qXCJdLFxuICAgICAgICAgICAgXCJqc1wiOiBbXCJzcmMvcGFnZXMvY29udGVudC9pbmRleC50c3hcIl0sXG4gICAgICAgICAgICBcImNzc1wiOiBbXCJjb250ZW50U3R5bGUuY3NzXCJdXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJyZXNvdXJjZXNcIjogW1wiY29udGVudFN0eWxlLmNzc1wiLCBcImljb24tMTI4LnBuZ1wiLCBcImljb24tMzIucG5nXCJdLFxuICAgICAgICAgICAgXCJtYXRjaGVzXCI6IFtdXG4gICAgICAgIH1cbiAgICBdXG59XG4iLCAie1xuICAgIFwiYWN0aW9uXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0X2ljb25cIjogXCJwdWJsaWMvZGV2LWljb24tMzIucG5nXCIsXG4gICAgICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInNyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sXCJcbiAgICB9LFxuICAgIFwiaWNvbnNcIjoge1xuICAgICAgICBcIjEyOFwiOiBcInB1YmxpYy9kZXYtaWNvbi0xMjgucG5nXCJcbiAgICB9LFxuICAgIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJyZXNvdXJjZXNcIjogW1xuICAgICAgICAgICAgICAgIFwiY29udGVudFN0eWxlLmNzc1wiLFxuICAgICAgICAgICAgICAgIFwiZGV2LWljb24tMTI4LnBuZ1wiLFxuICAgICAgICAgICAgICAgIFwiZGV2LWljb24tMzIucG5nXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcIm1hdGNoZXNcIjogW11cbiAgICAgICAgfVxuICAgIF1cbn1cbiIsICJ7XG4gICAgXCJuYW1lXCI6IFwidml0ZS13ZWItZXh0ZW5zaW9uXCIsXG4gICAgXCJ2ZXJzaW9uXCI6IFwiMi4wXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIGNocm9tZSBleHRlbnNpb24gdGVtcGxhdGUgd2l0aCBWaXRlLCBSZWFjdCwgVHlwZVNjcmlwdCBhbmQgVGFpbHdpbmQgQ1NTLlwiLFxuICAgIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICAgIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9IZXJvYnJlYWQvYmV0dGVyLXN0dWRyZXMtdjJcIlxuICAgIH0sXG4gICAgXCJzY3JpcHRzXCI6IHtcbiAgICAgICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICAgICAgXCJkZXZcIjogXCJub2RlbW9uXCIsXG4gICAgICAgIFwiZm9ybWF0XCI6IFwieWFybiBwcmV0dGllciAuIC0td3JpdGVcIlxuICAgIH0sXG4gICAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gICAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI6IFwiXjEuMC4yXCIsXG4gICAgICAgIFwiY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5XCI6IFwiXjAuNy4wXCIsXG4gICAgICAgIFwiY2xzeFwiOiBcIl4yLjEuMFwiLFxuICAgICAgICBcImx1Y2lkZS1yZWFjdFwiOiBcIl4wLjM2NS4wXCIsXG4gICAgICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjIuMFwiLFxuICAgICAgICBcInRhaWx3aW5kLW1lcmdlXCI6IFwiXjIuMi4yXCIsXG4gICAgICAgIFwidGFpbHdpbmRjc3MtYW5pbWF0ZVwiOiBcIl4xLjAuN1wiLFxuICAgICAgICBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEwLjBcIlxuICAgIH0sXG4gICAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgICAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIl4xLjAuMTRcIixcbiAgICAgICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yNTNcIixcbiAgICAgICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xNy4xXCIsXG4gICAgICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuMzlcIixcbiAgICAgICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjIuMTdcIixcbiAgICAgICAgXCJAdHlwZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiLFxuICAgICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjUuNDkuMFwiLFxuICAgICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNS40OS4wXCIsXG4gICAgICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI6IFwiXjMuMC4xXCIsXG4gICAgICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTZcIixcbiAgICAgICAgXCJlc2xpbnRcIjogXCJeOC4zMi4wXCIsXG4gICAgICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl44LjYuMFwiLFxuICAgICAgICBcImVzbGludC1wbHVnaW4taW1wb3J0XCI6IFwiXjIuMjcuNVwiLFxuICAgICAgICBcImVzbGludC1wbHVnaW4tanN4LWExMXlcIjogXCJeNi43LjFcIixcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0XCI6IFwiXjcuMzIuMVwiLFxuICAgICAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNC4zLjBcIixcbiAgICAgICAgXCJmcy1leHRyYVwiOiBcIl4xMS4xLjBcIixcbiAgICAgICAgXCJub2RlbW9uXCI6IFwiXjIuMC4yMFwiLFxuICAgICAgICBcInBvc3Rjc3NcIjogXCJeOC40LjMxXCIsXG4gICAgICAgIFwicHJldHRpZXJcIjogXCIzLjIuNVwiLFxuICAgICAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuMy41XCIsXG4gICAgICAgIFwidHMtbm9kZVwiOiBcIl4xMC45LjFcIixcbiAgICAgICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjQuOS40XCIsXG4gICAgICAgIFwidml0ZVwiOiBcIl40LjUuMFwiXG4gICAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVyxPQUFPLFdBQVc7QUFDclgsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sUUFBUTtBQUNmLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsV0FBNkI7OztBQ0p0QztBQUFBLEVBQ0ksa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsUUFBVTtBQUFBLElBQ04sZUFBaUI7QUFBQSxJQUNqQixjQUFnQjtBQUFBLE1BQ1osTUFBTTtBQUFBLElBQ1Y7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsRUFDWDtBQUFBLEVBQ0EsYUFBZSxDQUFDLFNBQVM7QUFBQSxFQUN6QixpQkFBbUI7QUFBQSxJQUNmO0FBQUEsTUFDSSxTQUFXLENBQUMsdUNBQXVDO0FBQUEsTUFDbkQsSUFBTSxDQUFDLDZCQUE2QjtBQUFBLE1BQ3BDLEtBQU8sQ0FBQyxrQkFBa0I7QUFBQSxJQUM5QjtBQUFBLEVBQ0o7QUFBQSxFQUNBLDBCQUE0QjtBQUFBLElBQ3hCO0FBQUEsTUFDSSxXQUFhLENBQUMsb0JBQW9CLGdCQUFnQixhQUFhO0FBQUEsTUFDL0QsU0FBVyxDQUFDO0FBQUEsSUFDaEI7QUFBQSxFQUNKO0FBQ0o7OztBQzNCQTtBQUFBLEVBQ0ksUUFBVTtBQUFBLElBQ04sY0FBZ0I7QUFBQSxJQUNoQixlQUFpQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxPQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsRUFDWDtBQUFBLEVBQ0EsMEJBQTRCO0FBQUEsSUFDeEI7QUFBQSxNQUNJLFdBQWE7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQUEsTUFDQSxTQUFXLENBQUM7QUFBQSxJQUNoQjtBQUFBLEVBQ0o7QUFDSjs7O0FDbEJBO0FBQUEsRUFDSSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxZQUFjO0FBQUEsSUFDVixNQUFRO0FBQUEsSUFDUixLQUFPO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1AsT0FBUztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsUUFBVTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLE1BQVE7QUFBQSxFQUNSLGNBQWdCO0FBQUEsSUFDWix3QkFBd0I7QUFBQSxJQUN4Qiw0QkFBNEI7QUFBQSxJQUM1QixNQUFRO0FBQUEsSUFDUixnQkFBZ0I7QUFBQSxJQUNoQixPQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixrQkFBa0I7QUFBQSxJQUNsQix1QkFBdUI7QUFBQSxJQUN2Qix5QkFBeUI7QUFBQSxFQUM3QjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDZixzQkFBc0I7QUFBQSxJQUN0QixpQkFBaUI7QUFBQSxJQUNqQixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxJQUNoQixvQkFBb0I7QUFBQSxJQUNwQixnQ0FBZ0M7QUFBQSxJQUNoQyxvQ0FBb0M7QUFBQSxJQUNwQyw2QkFBNkI7QUFBQSxJQUM3Qiw0QkFBNEI7QUFBQSxJQUM1QixjQUFnQjtBQUFBLElBQ2hCLFFBQVU7QUFBQSxJQUNWLDBCQUEwQjtBQUFBLElBQzFCLHdCQUF3QjtBQUFBLElBQ3hCLDBCQUEwQjtBQUFBLElBQzFCLHVCQUF1QjtBQUFBLElBQ3ZCLDZCQUE2QjtBQUFBLElBQzdCLFlBQVk7QUFBQSxJQUNaLFNBQVc7QUFBQSxJQUNYLFNBQVc7QUFBQSxJQUNYLFVBQVk7QUFBQSxJQUNaLGFBQWU7QUFBQSxJQUNmLFdBQVc7QUFBQSxJQUNYLFlBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxFQUNaO0FBQ0o7OztBSHBEQSxJQUFNLG1DQUFtQztBQVV6QyxJQUFNLE9BQU8sUUFBUSxrQ0FBVyxLQUFLO0FBQ3JDLElBQU0sV0FBVyxRQUFRLE1BQU0sT0FBTztBQUN0QyxJQUFNLFlBQVksUUFBUSxNQUFNLFFBQVE7QUFDeEMsSUFBTSxTQUFTLFFBQVEsa0NBQVcsTUFBTTtBQUN4QyxJQUFNLFlBQVksUUFBUSxrQ0FBVyxRQUFRO0FBRTdDLElBQU0sUUFBUSxRQUFRLElBQUksWUFBWTtBQUV0QyxJQUFNLG9CQUFvQjtBQUFBLEVBQ3RCLEdBQUc7QUFBQSxFQUNILEdBQUksUUFBUSx1QkFBZSxDQUFDO0FBQUEsRUFDNUIsTUFBTSxRQUFRLFFBQVEsaUJBQVMsSUFBSSxLQUFLLGlCQUFTO0FBQUEsRUFDakQsU0FBUyxnQkFBSTtBQUNqQjtBQUdBLFNBQVMsY0FBYyxPQUFnQjtBQUNuQyxNQUFJO0FBQU8sV0FBTztBQUVsQixTQUFPO0FBQUEsSUFDSCxNQUFNO0FBQUEsSUFDTixVQUFVLFFBQWdCO0FBQ3RCLGFBQU8sV0FBVyxtQkFBbUIsU0FBUztBQUFBLElBQ2xEO0FBQUEsSUFDQSxZQUFZLGVBQW9CLGNBQW1CO0FBQy9DLFlBQU1BLFVBQVMsY0FBYztBQUM3QixTQUFHO0FBQUEsUUFBRyxRQUFRQSxTQUFRLGlCQUFpQjtBQUFBLFFBQUcsTUFDdEMsUUFBUSxJQUFJLHdDQUF3QztBQUFBLE1BQ3hEO0FBQ0EsU0FBRztBQUFBLFFBQUcsUUFBUUEsU0FBUSxrQkFBa0I7QUFBQSxRQUFHLE1BQ3ZDLFFBQVEsSUFBSSx5Q0FBeUM7QUFBQSxNQUN6RDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0o7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsSUFDZDtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNBLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLFFBQ1osV0FBVztBQUFBLE1BQ2Y7QUFBQSxJQUNKLENBQUM7QUFBQSxJQUNELGNBQWMsS0FBSztBQUFBLEVBQ3ZCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0g7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLGFBQWEsQ0FBQztBQUFBLEVBQ2xCO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFsib3V0RGlyIl0KfQo=
