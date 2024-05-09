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
    "@hookform/resolvers": "^3.3.4",
    "@radix-ui/react-context-menu": "^2.1.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@tanstack/react-query": "^5.32.1",
    "class-variance-authority": "^0.7.0",
    clsx: "^2.1.0",
    cmdk: "^1.0.0",
    "lucide-react": "^0.365.0",
    "postcss-parent-selector": "^1.0.0",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.51.3",
    "tailwind-merge": "^2.2.2",
    "tailwindcss-animate": "^1.0.7",
    "webextension-polyfill": "^0.10.0",
    zod: "^3.23.6"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^1.0.14",
    "@tanstack/eslint-plugin-query": "^5.32.1",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4ZVxcXFx2c2NvZGVcXFxcZXh0ZW5zaW9uc1xcXFxiZXR0ZXItc3R1ZHJlcy12Mi1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4ZVxcXFx2c2NvZGVcXFxcZXh0ZW5zaW9uc1xcXFxiZXR0ZXItc3R1ZHJlcy12Mi1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbGV4ZS92c2NvZGUvZXh0ZW5zaW9ucy9iZXR0ZXItc3R1ZHJlcy12Mi1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIlxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHsgY3J4LCBNYW5pZmVzdFYzRXhwb3J0IH0gZnJvbSBcIkBjcnhqcy92aXRlLXBsdWdpblwiXG5cbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5qc29uXCJcbmltcG9ydCBkZXZNYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5kZXYuanNvblwiXG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiXG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIilcbmNvbnN0IHBhZ2VzRGlyID0gcmVzb2x2ZShyb290LCBcInBhZ2VzXCIpXG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsIFwiYXNzZXRzXCIpXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpXG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJwdWJsaWNcIilcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIlxuXG5jb25zdCBleHRlbnNpb25NYW5pZmVzdCA9IHtcbiAgICAuLi5tYW5pZmVzdCxcbiAgICAuLi4oaXNEZXYgPyBkZXZNYW5pZmVzdCA6ICh7fSBhcyBNYW5pZmVzdFYzRXhwb3J0KSksXG4gICAgbmFtZTogaXNEZXYgPyBgREVWOiAke21hbmlmZXN0Lm5hbWV9YCA6IG1hbmlmZXN0Lm5hbWUsXG4gICAgdmVyc2lvbjogcGtnLnZlcnNpb24sXG59XG5cbi8vIHBsdWdpbiB0byByZW1vdmUgZGV2IGljb25zIGZyb20gcHJvZCBidWlsZFxuZnVuY3Rpb24gc3RyaXBEZXZJY29ucyhhcHBseTogYm9vbGVhbikge1xuICAgIGlmIChhcHBseSkgcmV0dXJuIG51bGxcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IFwic3RyaXAtZGV2LWljb25zXCIsXG4gICAgICAgIHJlc29sdmVJZChzb3VyY2U6IHN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZSA9PT0gXCJ2aXJ0dWFsLW1vZHVsZVwiID8gc291cmNlIDogbnVsbFxuICAgICAgICB9LFxuICAgICAgICByZW5kZXJTdGFydChvdXRwdXRPcHRpb25zOiBhbnksIGlucHV0T3B0aW9uczogYW55KSB7XG4gICAgICAgICAgICBjb25zdCBvdXREaXIgPSBvdXRwdXRPcHRpb25zLmRpclxuICAgICAgICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMzIucG5nXCIpLCAoKSA9PlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTMyLnBuZyBmcm0gcHJvZCBidWlsZGApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMTI4LnBuZ1wiKSwgKCkgPT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBkZXYtaWNvbi0xMjgucG5nIGZybSBwcm9kIGJ1aWxkYCksXG4gICAgICAgICAgICApXG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgIFwiQHNyY1wiOiByb290LFxuICAgICAgICAgICAgXCJAYXNzZXRzXCI6IGFzc2V0c0RpcixcbiAgICAgICAgICAgIFwiQHBhZ2VzXCI6IHBhZ2VzRGlyLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgICAgICBjcngoe1xuICAgICAgICAgICAgbWFuaWZlc3Q6IGV4dGVuc2lvbk1hbmlmZXN0IGFzIE1hbmlmZXN0VjNFeHBvcnQsXG4gICAgICAgICAgICBjb250ZW50U2NyaXB0czoge1xuICAgICAgICAgICAgICAgIGluamVjdENzczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgICBzdHJpcERldkljb25zKGlzRGV2KSxcbiAgICBdLFxuICAgIHB1YmxpY0RpcixcbiAgICBidWlsZDoge1xuICAgICAgICBvdXREaXIsXG4gICAgICAgIHNvdXJjZW1hcDogaXNEZXYsXG4gICAgICAgIGVtcHR5T3V0RGlyOiAhaXNEZXYsXG4gICAgfSxcbn0pXG4iLCAie1xuICAgIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxuICAgIFwibmFtZVwiOiBcIkJldHRlciBTdHVkcmVzXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoaXMgaXMgYW4gZXh0ZW5zaW9uIHRvIGltcHJvdmUgc3R1ZHJlcyBhcHBlYXJlbmNlLlwiLFxuICAgIFwiYWN0aW9uXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcbiAgICAgICAgXCJkZWZhdWx0X2ljb25cIjoge1xuICAgICAgICAgICAgXCIzMlwiOiBcImljb24tMzIucG5nXCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJpY29uc1wiOiB7XG4gICAgICAgIFwiMTI4XCI6IFwiaWNvbi0xMjgucG5nXCJcbiAgICB9LFxuICAgIFwicGVybWlzc2lvbnNcIjogW1wic3RvcmFnZVwiXSxcbiAgICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwibWF0Y2hlc1wiOiBbXCJodHRwczovL3N0dWRyZXMuY3Muc3QtYW5kcmV3cy5hYy51ay8qXCJdLFxuICAgICAgICAgICAgXCJqc1wiOiBbXCJzcmMvcGFnZXMvY29udGVudC9pbmRleC50c3hcIl0sXG4gICAgICAgICAgICBcImNzc1wiOiBbXCJjb250ZW50U3R5bGUuY3NzXCJdXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJyZXNvdXJjZXNcIjogW1wiY29udGVudFN0eWxlLmNzc1wiLCBcImljb24tMTI4LnBuZ1wiLCBcImljb24tMzIucG5nXCJdLFxuICAgICAgICAgICAgXCJtYXRjaGVzXCI6IFtdXG4gICAgICAgIH1cbiAgICBdXG59XG4iLCAie1xuICAgIFwiYWN0aW9uXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0X2ljb25cIjogXCJwdWJsaWMvZGV2LWljb24tMzIucG5nXCIsXG4gICAgICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInNyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sXCJcbiAgICB9LFxuICAgIFwiaWNvbnNcIjoge1xuICAgICAgICBcIjEyOFwiOiBcInB1YmxpYy9kZXYtaWNvbi0xMjgucG5nXCJcbiAgICB9LFxuICAgIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJyZXNvdXJjZXNcIjogW1xuICAgICAgICAgICAgICAgIFwiY29udGVudFN0eWxlLmNzc1wiLFxuICAgICAgICAgICAgICAgIFwiZGV2LWljb24tMTI4LnBuZ1wiLFxuICAgICAgICAgICAgICAgIFwiZGV2LWljb24tMzIucG5nXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcIm1hdGNoZXNcIjogW11cbiAgICAgICAgfVxuICAgIF1cbn1cbiIsICJ7XHJcbiAgICBcIm5hbWVcIjogXCJ2aXRlLXdlYi1leHRlbnNpb25cIixcclxuICAgIFwidmVyc2lvblwiOiBcIjIuMFwiLFxyXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIGNocm9tZSBleHRlbnNpb24gdGVtcGxhdGUgd2l0aCBWaXRlLCBSZWFjdCwgVHlwZVNjcmlwdCBhbmQgVGFpbHdpbmQgQ1NTLlwiLFxyXG4gICAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXHJcbiAgICBcInJlcG9zaXRvcnlcIjoge1xyXG4gICAgICAgIFwidHlwZVwiOiBcImdpdFwiLFxyXG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0hlcm9icmVhZC9iZXR0ZXItc3R1ZHJlcy12MlwiXHJcbiAgICB9LFxyXG4gICAgXCJzY3JpcHRzXCI6IHtcclxuICAgICAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxyXG4gICAgICAgIFwiZGV2XCI6IFwibm9kZW1vblwiLFxyXG4gICAgICAgIFwiZm9ybWF0XCI6IFwieWFybiBwcmV0dGllciAuIC0td3JpdGVcIlxyXG4gICAgfSxcclxuICAgIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gICAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgICAgIFwiQGhvb2tmb3JtL3Jlc29sdmVyc1wiOiBcIl4zLjMuNFwiLFxyXG4gICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWNvbnRleHQtbWVudVwiOiBcIl4yLjEuNVwiLFxyXG4gICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWRpYWxvZ1wiOiBcIl4xLjAuNVwiLFxyXG4gICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnVcIjogXCJeMi4wLjZcIixcclxuICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1sYWJlbFwiOiBcIl4yLjAuMlwiLFxyXG4gICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LXBvcG92ZXJcIjogXCJeMS4wLjdcIixcclxuICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1zZXBhcmF0b3JcIjogXCJeMS4wLjNcIixcclxuICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI6IFwiXjEuMC4yXCIsXHJcbiAgICAgICAgXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIjogXCJeNS4zMi4xXCIsXHJcbiAgICAgICAgXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIjogXCJeMC43LjBcIixcclxuICAgICAgICBcImNsc3hcIjogXCJeMi4xLjBcIixcclxuICAgICAgICBcImNtZGtcIjogXCJeMS4wLjBcIixcclxuICAgICAgICBcImx1Y2lkZS1yZWFjdFwiOiBcIl4wLjM2NS4wXCIsXHJcbiAgICAgICAgXCJwb3N0Y3NzLXBhcmVudC1zZWxlY3RvclwiOiBcIl4xLjAuMFwiLFxyXG4gICAgICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXHJcbiAgICAgICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXHJcbiAgICAgICAgXCJyZWFjdC1ob29rLWZvcm1cIjogXCJeNy41MS4zXCIsXHJcbiAgICAgICAgXCJ0YWlsd2luZC1tZXJnZVwiOiBcIl4yLjIuMlwiLFxyXG4gICAgICAgIFwidGFpbHdpbmRjc3MtYW5pbWF0ZVwiOiBcIl4xLjAuN1wiLFxyXG4gICAgICAgIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiLFxyXG4gICAgICAgIFwiem9kXCI6IFwiXjMuMjMuNlwiXHJcbiAgICB9LFxyXG4gICAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjEuMC4xNFwiLFxyXG4gICAgICAgIFwiQHRhbnN0YWNrL2VzbGludC1wbHVnaW4tcXVlcnlcIjogXCJeNS4zMi4xXCIsXHJcbiAgICAgICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yNTNcIixcclxuICAgICAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE4LjE3LjFcIixcclxuICAgICAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4yLjM5XCIsXHJcbiAgICAgICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjIuMTdcIixcclxuICAgICAgICBcIkB0eXBlcy93ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMC4wXCIsXHJcbiAgICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl41LjQ5LjBcIixcclxuICAgICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNS40OS4wXCIsXHJcbiAgICAgICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjogXCJeMy4wLjFcIixcclxuICAgICAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE5XCIsXHJcbiAgICAgICAgXCJlc2xpbnRcIjogXCJeOC4zMi4wXCIsXHJcbiAgICAgICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjguNi4wXCIsXHJcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIl4yLjI3LjVcIixcclxuICAgICAgICBcImVzbGludC1wbHVnaW4tanN4LWExMXlcIjogXCJeNi43LjFcIixcclxuICAgICAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeNy4zMi4xXCIsXHJcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuMy4wXCIsXHJcbiAgICAgICAgXCJmcy1leHRyYVwiOiBcIl4xMS4xLjBcIixcclxuICAgICAgICBcIm5vZGVtb25cIjogXCJeMi4wLjIwXCIsXHJcbiAgICAgICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zOFwiLFxyXG4gICAgICAgIFwicHJldHRpZXJcIjogXCIzLjIuNVwiLFxyXG4gICAgICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjNcIixcclxuICAgICAgICBcInRzLW5vZGVcIjogXCJeMTAuOS4xXCIsXHJcbiAgICAgICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjQuOS40XCIsXHJcbiAgICAgICAgXCJ2aXRlXCI6IFwiXjQuNS4wXCJcclxuICAgIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1XLE9BQU8sV0FBVztBQUNyWCxTQUFTLGVBQWU7QUFDeEIsT0FBTyxRQUFRO0FBQ2YsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxXQUE2Qjs7O0FDSnRDO0FBQUEsRUFDSSxrQkFBb0I7QUFBQSxFQUNwQixNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixRQUFVO0FBQUEsSUFDTixlQUFpQjtBQUFBLElBQ2pCLGNBQWdCO0FBQUEsTUFDWixNQUFNO0FBQUEsSUFDVjtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxFQUNYO0FBQUEsRUFDQSxhQUFlLENBQUMsU0FBUztBQUFBLEVBQ3pCLGlCQUFtQjtBQUFBLElBQ2Y7QUFBQSxNQUNJLFNBQVcsQ0FBQyx1Q0FBdUM7QUFBQSxNQUNuRCxJQUFNLENBQUMsNkJBQTZCO0FBQUEsTUFDcEMsS0FBTyxDQUFDLGtCQUFrQjtBQUFBLElBQzlCO0FBQUEsRUFDSjtBQUFBLEVBQ0EsMEJBQTRCO0FBQUEsSUFDeEI7QUFBQSxNQUNJLFdBQWEsQ0FBQyxvQkFBb0IsZ0JBQWdCLGFBQWE7QUFBQSxNQUMvRCxTQUFXLENBQUM7QUFBQSxJQUNoQjtBQUFBLEVBQ0o7QUFDSjs7O0FDM0JBO0FBQUEsRUFDSSxR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
