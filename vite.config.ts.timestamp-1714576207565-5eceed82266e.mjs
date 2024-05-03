// vite.config.ts
import react from "file:///C:/Users/alexe/vscode/extensions/better-studres-v2-main/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import fs from "fs";
import { defineConfig } from "file:///C:/Users/alexe/vscode/extensions/better-studres-v2-main/node_modules/vite/dist/node/index.js";
import { crx } from "file:///C:/Users/alexe/vscode/extensions/better-studres-v2-main/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Better Studres",
  description: "This is an extension to improve studres appearence.",
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: {
      "32": "icon-32.png"
    }
  },
  icons: {
    "128": "icon-128.png"
  },
  permissions: ["storage"],
  content_scripts: [
    {
      matches: ["https://studres.cs.st-andrews.ac.uk/*"],
      js: ["src/pages/content/index.tsx"],
      css: ["contentStyle.css"]
    }
  ],
  web_accessible_resources: [
    {
      resources: ["contentStyle.css", "icon-128.png", "icon-32.png"],
      matches: []
    }
  ]
};

// manifest.dev.json
var manifest_dev_default = {
  action: {
    default_icon: "public/dev-icon-32.png",
    default_popup: "src/pages/popup/index.html"
  },
  icons: {
    "128": "public/dev-icon-128.png"
  },
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "dev-icon-128.png",
        "dev-icon-32.png"
      ],
      matches: []
    }
  ]
};

// package.json
var package_default = {
  name: "vite-web-extension",
  version: "2.0",
  description: "A simple chrome extension template with Vite, React, TypeScript and Tailwind CSS.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/Herobread/better-studres-v2"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon",
    format: "yarn prettier . --write"
  },
  type: "module",
  dependencies: {
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    clsx: "^2.1.0",
    "lucide-react": "^0.365.0",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.2.2",
    "tailwindcss-animate": "^1.0.7",
    "webextension-polyfill": "^0.10.0"
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
    autoprefixer: "^10.4.19",
    eslint: "^8.32.0",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.32.1",
    "eslint-plugin-react-hooks": "^4.3.0",
    "fs-extra": "^11.1.0",
    nodemon: "^2.0.20",
    postcss: "^8.4.38",
    prettier: "3.2.5",
    tailwindcss: "^3.4.3",
    "ts-node": "^10.9.1",
    typescript: "^4.9.4",
    vite: "^4.5.0"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\alexe\\vscode\\extensions\\better-studres-v2-main";
var root = resolve(__vite_injected_original_dirname, "src");
var pagesDir = resolve(root, "pages");
var assetsDir = resolve(root, "assets");
var outDir = resolve(__vite_injected_original_dirname, "dist");
var publicDir = resolve(__vite_injected_original_dirname, "public");
var isDev = process.env.__DEV__ === "true";
var extensionManifest = {
  ...manifest_default,
  ...isDev ? manifest_dev_default : {},
  name: isDev ? `DEV: ${manifest_default.name}` : manifest_default.name,
  version: package_default.version
};
function stripDevIcons(apply) {
  if (apply)
    return null;
  return {
    name: "strip-dev-icons",
    resolveId(source) {
      return source === "virtual-module" ? source : null;
    },
    renderStart(outputOptions, inputOptions) {
      const outDir2 = outputOptions.dir;
      fs.rm(
        resolve(outDir2, "dev-icon-32.png"),
        () => console.log(`Deleted dev-icon-32.png frm prod build`)
      );
      fs.rm(
        resolve(outDir2, "dev-icon-128.png"),
        () => console.log(`Deleted dev-icon-128.png frm prod build`)
      );
    }
  };
}
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    crx({
      manifest: extensionManifest,
      contentScripts: {
        injectCss: true
      }
    }),
    stripDevIcons(isDev)
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: !isDev
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4ZVxcXFx2c2NvZGVcXFxcZXh0ZW5zaW9uc1xcXFxiZXR0ZXItc3R1ZHJlcy12Mi1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4ZVxcXFx2c2NvZGVcXFxcZXh0ZW5zaW9uc1xcXFxiZXR0ZXItc3R1ZHJlcy12Mi1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbGV4ZS92c2NvZGUvZXh0ZW5zaW9ucy9iZXR0ZXItc3R1ZHJlcy12Mi1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIlxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHsgY3J4LCBNYW5pZmVzdFYzRXhwb3J0IH0gZnJvbSBcIkBjcnhqcy92aXRlLXBsdWdpblwiXG5cbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5qc29uXCJcbmltcG9ydCBkZXZNYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5kZXYuanNvblwiXG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiXG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIilcbmNvbnN0IHBhZ2VzRGlyID0gcmVzb2x2ZShyb290LCBcInBhZ2VzXCIpXG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsIFwiYXNzZXRzXCIpXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpXG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJwdWJsaWNcIilcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIlxuXG5jb25zdCBleHRlbnNpb25NYW5pZmVzdCA9IHtcbiAgICAuLi5tYW5pZmVzdCxcbiAgICAuLi4oaXNEZXYgPyBkZXZNYW5pZmVzdCA6ICh7fSBhcyBNYW5pZmVzdFYzRXhwb3J0KSksXG4gICAgbmFtZTogaXNEZXYgPyBgREVWOiAke21hbmlmZXN0Lm5hbWV9YCA6IG1hbmlmZXN0Lm5hbWUsXG4gICAgdmVyc2lvbjogcGtnLnZlcnNpb24sXG59XG5cbi8vIHBsdWdpbiB0byByZW1vdmUgZGV2IGljb25zIGZyb20gcHJvZCBidWlsZFxuZnVuY3Rpb24gc3RyaXBEZXZJY29ucyhhcHBseTogYm9vbGVhbikge1xuICAgIGlmIChhcHBseSkgcmV0dXJuIG51bGxcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IFwic3RyaXAtZGV2LWljb25zXCIsXG4gICAgICAgIHJlc29sdmVJZChzb3VyY2U6IHN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZSA9PT0gXCJ2aXJ0dWFsLW1vZHVsZVwiID8gc291cmNlIDogbnVsbFxuICAgICAgICB9LFxuICAgICAgICByZW5kZXJTdGFydChvdXRwdXRPcHRpb25zOiBhbnksIGlucHV0T3B0aW9uczogYW55KSB7XG4gICAgICAgICAgICBjb25zdCBvdXREaXIgPSBvdXRwdXRPcHRpb25zLmRpclxuICAgICAgICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMzIucG5nXCIpLCAoKSA9PlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTMyLnBuZyBmcm0gcHJvZCBidWlsZGApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMTI4LnBuZ1wiKSwgKCkgPT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBkZXYtaWNvbi0xMjgucG5nIGZybSBwcm9kIGJ1aWxkYCksXG4gICAgICAgICAgICApXG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgIFwiQHNyY1wiOiByb290LFxuICAgICAgICAgICAgXCJAYXNzZXRzXCI6IGFzc2V0c0RpcixcbiAgICAgICAgICAgIFwiQHBhZ2VzXCI6IHBhZ2VzRGlyLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgICAgICBjcngoe1xuICAgICAgICAgICAgbWFuaWZlc3Q6IGV4dGVuc2lvbk1hbmlmZXN0IGFzIE1hbmlmZXN0VjNFeHBvcnQsXG4gICAgICAgICAgICBjb250ZW50U2NyaXB0czoge1xuICAgICAgICAgICAgICAgIGluamVjdENzczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgICBzdHJpcERldkljb25zKGlzRGV2KSxcbiAgICBdLFxuICAgIHB1YmxpY0RpcixcbiAgICBidWlsZDoge1xuICAgICAgICBvdXREaXIsXG4gICAgICAgIHNvdXJjZW1hcDogaXNEZXYsXG4gICAgICAgIGVtcHR5T3V0RGlyOiAhaXNEZXYsXG4gICAgfSxcbn0pXG4iLCAie1xuICAgIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxuICAgIFwibmFtZVwiOiBcIkJldHRlciBTdHVkcmVzXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoaXMgaXMgYW4gZXh0ZW5zaW9uIHRvIGltcHJvdmUgc3R1ZHJlcyBhcHBlYXJlbmNlLlwiLFxuICAgIFwiYWN0aW9uXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcbiAgICAgICAgXCJkZWZhdWx0X2ljb25cIjoge1xuICAgICAgICAgICAgXCIzMlwiOiBcImljb24tMzIucG5nXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJpY29uc1wiOiB7XG4gICAgICAgIFwiMTI4XCI6IFwiaWNvbi0xMjgucG5nXCJcbiAgICB9LFxuICAgIFwicGVybWlzc2lvbnNcIjogW1wic3RvcmFnZVwiXSxcbiAgICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwibWF0Y2hlc1wiOiBbXCJodHRwczovL3N0dWRyZXMuY3Muc3QtYW5kcmV3cy5hYy51ay8qXCJdLFxuICAgICAgICAgICAgXCJqc1wiOiBbXCJzcmMvcGFnZXMvY29udGVudC9pbmRleC50c3hcIl0sXG4gICAgICAgICAgICBcImNzc1wiOiBbXCJjb250ZW50U3R5bGUuY3NzXCJdXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJyZXNvdXJjZXNcIjogW1wiY29udGVudFN0eWxlLmNzc1wiLCBcImljb24tMTI4LnBuZ1wiLCBcImljb24tMzIucG5nXCJdLFxuICAgICAgICAgICAgXCJtYXRjaGVzXCI6IFtdXG4gICAgICAgIH1cbiAgICBdXG59XG4iLCAie1xuICAgIFwiYWN0aW9uXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0X2ljb25cIjogXCJwdWJsaWMvZGV2LWljb24tMzIucG5nXCIsXG4gICAgICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInNyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sXCJcbiAgICB9LFxuICAgIFwiaWNvbnNcIjoge1xuICAgICAgICBcIjEyOFwiOiBcInB1YmxpYy9kZXYtaWNvbi0xMjgucG5nXCJcbiAgICB9LFxuICAgIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJyZXNvdXJjZXNcIjogW1xuICAgICAgICAgICAgICAgIFwiY29udGVudFN0eWxlLmNzc1wiLFxuICAgICAgICAgICAgICAgIFwiZGV2LWljb24tMTI4LnBuZ1wiLFxuICAgICAgICAgICAgICAgIFwiZGV2LWljb24tMzIucG5nXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcIm1hdGNoZXNcIjogW11cbiAgICAgICAgfVxuICAgIF1cbn1cbiIsICJ7XG4gICAgXCJuYW1lXCI6IFwidml0ZS13ZWItZXh0ZW5zaW9uXCIsXG4gICAgXCJ2ZXJzaW9uXCI6IFwiMi4wXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIGNocm9tZSBleHRlbnNpb24gdGVtcGxhdGUgd2l0aCBWaXRlLCBSZWFjdCwgVHlwZVNjcmlwdCBhbmQgVGFpbHdpbmQgQ1NTLlwiLFxuICAgIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICAgIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9IZXJvYnJlYWQvYmV0dGVyLXN0dWRyZXMtdjJcIlxuICAgIH0sXG4gICAgXCJzY3JpcHRzXCI6IHtcbiAgICAgICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICAgICAgXCJkZXZcIjogXCJub2RlbW9uXCIsXG4gICAgICAgIFwiZm9ybWF0XCI6IFwieWFybiBwcmV0dGllciAuIC0td3JpdGVcIlxuICAgIH0sXG4gICAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gICAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1zZXBhcmF0b3JcIjogXCJeMS4wLjNcIixcbiAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3Qtc2xvdFwiOiBcIl4xLjAuMlwiLFxuICAgICAgICBcImNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eVwiOiBcIl4wLjcuMFwiLFxuICAgICAgICBcImNsc3hcIjogXCJeMi4xLjBcIixcbiAgICAgICAgXCJsdWNpZGUtcmVhY3RcIjogXCJeMC4zNjUuMFwiLFxuICAgICAgICBcInJlYWN0XCI6IFwiXjE4LjIuMFwiLFxuICAgICAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICAgICAgXCJ0YWlsd2luZC1tZXJnZVwiOiBcIl4yLjIuMlwiLFxuICAgICAgICBcInRhaWx3aW5kY3NzLWFuaW1hdGVcIjogXCJeMS4wLjdcIixcbiAgICAgICAgXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMC4wXCJcbiAgICB9LFxuICAgIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICAgICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCJeMS4wLjE0XCIsXG4gICAgICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjUzXCIsXG4gICAgICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMTguMTcuMVwiLFxuICAgICAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4yLjM5XCIsXG4gICAgICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4yLjE3XCIsXG4gICAgICAgIFwiQHR5cGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEwLjBcIixcbiAgICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl41LjQ5LjBcIixcbiAgICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNDkuMFwiLFxuICAgICAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjAuMVwiLFxuICAgICAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE5XCIsXG4gICAgICAgIFwiZXNsaW50XCI6IFwiXjguMzIuMFwiLFxuICAgICAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOC42LjBcIixcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIl4yLjI3LjVcIixcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLWpzeC1hMTF5XCI6IFwiXjYuNy4xXCIsXG4gICAgICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdFwiOiBcIl43LjMyLjFcIixcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuMy4wXCIsXG4gICAgICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMS4wXCIsXG4gICAgICAgIFwibm9kZW1vblwiOiBcIl4yLjAuMjBcIixcbiAgICAgICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zOFwiLFxuICAgICAgICBcInByZXR0aWVyXCI6IFwiMy4yLjVcIixcbiAgICAgICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjQuM1wiLFxuICAgICAgICBcInRzLW5vZGVcIjogXCJeMTAuOS4xXCIsXG4gICAgICAgIFwidHlwZXNjcmlwdFwiOiBcIl40LjkuNFwiLFxuICAgICAgICBcInZpdGVcIjogXCJeNC41LjBcIlxuICAgIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVcsT0FBTyxXQUFXO0FBQ3JYLFNBQVMsZUFBZTtBQUN4QixPQUFPLFFBQVE7QUFDZixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLFdBQTZCOzs7QUNKdEM7QUFBQSxFQUNJLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFFBQVU7QUFBQSxJQUNOLGVBQWlCO0FBQUEsSUFDakIsY0FBZ0I7QUFBQSxNQUNaLE1BQU07QUFBQSxJQUNWO0FBQUEsRUFDSjtBQUFBLEVBQ0EsT0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNBLGFBQWUsQ0FBQyxTQUFTO0FBQUEsRUFDekIsaUJBQW1CO0FBQUEsSUFDZjtBQUFBLE1BQ0ksU0FBVyxDQUFDLHVDQUF1QztBQUFBLE1B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
