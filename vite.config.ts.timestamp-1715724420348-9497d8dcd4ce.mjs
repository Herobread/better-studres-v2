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
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@tanstack/react-query": "^5.32.1",
    "class-variance-authority": "^0.7.0",
    clsx: "^2.1.0",
    cmdk: "^1.0.0",
    "lucide-react": "^0.365.0",
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
    eslint: "^8.32.0",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.32.1",
    "eslint-plugin-react-hooks": "^4.3.0",
    "fs-extra": "^11.1.0",
    nodemon: "^3.1.0",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4ZVxcXFx2c2NvZGVcXFxcZXh0ZW5zaW9uc1xcXFxiZXR0ZXItc3R1ZHJlcy12Mi1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4ZVxcXFx2c2NvZGVcXFxcZXh0ZW5zaW9uc1xcXFxiZXR0ZXItc3R1ZHJlcy12Mi1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbGV4ZS92c2NvZGUvZXh0ZW5zaW9ucy9iZXR0ZXItc3R1ZHJlcy12Mi1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIlxyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIlxyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxyXG5pbXBvcnQgeyBjcngsIE1hbmlmZXN0VjNFeHBvcnQgfSBmcm9tIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCJcclxuXHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5qc29uXCJcclxuaW1wb3J0IGRldk1hbmlmZXN0IGZyb20gXCIuL21hbmlmZXN0LmRldi5qc29uXCJcclxuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIlxyXG5cclxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKVxyXG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUocm9vdCwgXCJwYWdlc1wiKVxyXG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsIFwiYXNzZXRzXCIpXHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcImRpc3RcIilcclxuY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwicHVibGljXCIpXHJcblxyXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiXHJcblxyXG5jb25zdCBleHRlbnNpb25NYW5pZmVzdCA9IHtcclxuICAgIC4uLm1hbmlmZXN0LFxyXG4gICAgLi4uKGlzRGV2ID8gZGV2TWFuaWZlc3QgOiAoe30gYXMgTWFuaWZlc3RWM0V4cG9ydCkpLFxyXG4gICAgbmFtZTogaXNEZXYgPyBgREVWOiAke21hbmlmZXN0Lm5hbWV9YCA6IG1hbmlmZXN0Lm5hbWUsXHJcbiAgICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcclxufVxyXG5cclxuLy8gcGx1Z2luIHRvIHJlbW92ZSBkZXYgaWNvbnMgZnJvbSBwcm9kIGJ1aWxkXHJcbmZ1bmN0aW9uIHN0cmlwRGV2SWNvbnMoYXBwbHk6IGJvb2xlYW4pIHtcclxuICAgIGlmIChhcHBseSkgcmV0dXJuIG51bGxcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6IFwic3RyaXAtZGV2LWljb25zXCIsXHJcbiAgICAgICAgcmVzb2x2ZUlkKHNvdXJjZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UgPT09IFwidmlydHVhbC1tb2R1bGVcIiA/IHNvdXJjZSA6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlclN0YXJ0KG91dHB1dE9wdGlvbnM6IGFueSwgaW5wdXRPcHRpb25zOiBhbnkpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3V0RGlyID0gb3V0cHV0T3B0aW9ucy5kaXJcclxuICAgICAgICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMzIucG5nXCIpLCAoKSA9PlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgZGV2LWljb24tMzIucG5nIGZybSBwcm9kIGJ1aWxkYCksXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMTI4LnBuZ1wiKSwgKCkgPT5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTEyOC5wbmcgZnJtIHByb2QgYnVpbGRgKSxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgXCJAc3JjXCI6IHJvb3QsXHJcbiAgICAgICAgICAgIFwiQGFzc2V0c1wiOiBhc3NldHNEaXIsXHJcbiAgICAgICAgICAgIFwiQHBhZ2VzXCI6IHBhZ2VzRGlyLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgY3J4KHtcclxuICAgICAgICAgICAgbWFuaWZlc3Q6IGV4dGVuc2lvbk1hbmlmZXN0IGFzIE1hbmlmZXN0VjNFeHBvcnQsXHJcbiAgICAgICAgICAgIGNvbnRlbnRTY3JpcHRzOiB7XHJcbiAgICAgICAgICAgICAgICBpbmplY3RDc3M6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3RyaXBEZXZJY29ucyhpc0RldiksXHJcbiAgICBdLFxyXG4gICAgcHVibGljRGlyLFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBvdXREaXIsXHJcbiAgICAgICAgc291cmNlbWFwOiBpc0RldixcclxuICAgICAgICBlbXB0eU91dERpcjogIWlzRGV2LFxyXG4gICAgfSxcclxufSlcclxuIiwgIntcbiAgICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcbiAgICBcIm5hbWVcIjogXCJCZXR0ZXIgU3R1ZHJlc1wiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGlzIGlzIGFuIGV4dGVuc2lvbiB0byBpbXByb3ZlIHN0dWRyZXMgYXBwZWFyZW5jZS5cIixcbiAgICBcImFjdGlvblwiOiB7XG4gICAgICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInNyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sXCIsXG4gICAgICAgIFwiZGVmYXVsdF9pY29uXCI6IHtcbiAgICAgICAgICAgIFwiMzJcIjogXCJpY29uLTMyLnBuZ1wiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiaWNvbnNcIjoge1xuICAgICAgICBcIjEyOFwiOiBcImljb24tMTI4LnBuZ1wiXG4gICAgfSxcbiAgICBcInBlcm1pc3Npb25zXCI6IFtcInN0b3JhZ2VcIl0sXG4gICAgXCJjb250ZW50X3NjcmlwdHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcIm1hdGNoZXNcIjogW1wiaHR0cHM6Ly9zdHVkcmVzLmNzLnN0LWFuZHJld3MuYWMudWsvKlwiXSxcbiAgICAgICAgICAgIFwianNcIjogW1wic3JjL3BhZ2VzL2NvbnRlbnQvaW5kZXgudHN4XCJdLFxuICAgICAgICAgICAgXCJjc3NcIjogW1wiY29udGVudFN0eWxlLmNzc1wiXVxuICAgICAgICB9XG4gICAgXSxcbiAgICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicmVzb3VyY2VzXCI6IFtcImNvbnRlbnRTdHlsZS5jc3NcIiwgXCJpY29uLTEyOC5wbmdcIiwgXCJpY29uLTMyLnBuZ1wiXSxcbiAgICAgICAgICAgIFwibWF0Y2hlc1wiOiBbXVxuICAgICAgICB9XG4gICAgXVxufVxuIiwgIntcbiAgICBcImFjdGlvblwiOiB7XG4gICAgICAgIFwiZGVmYXVsdF9pY29uXCI6IFwicHVibGljL2Rldi1pY29uLTMyLnBuZ1wiLFxuICAgICAgICBcImRlZmF1bHRfcG9wdXBcIjogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiXG4gICAgfSxcbiAgICBcImljb25zXCI6IHtcbiAgICAgICAgXCIxMjhcIjogXCJwdWJsaWMvZGV2LWljb24tMTI4LnBuZ1wiXG4gICAgfSxcbiAgICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicmVzb3VyY2VzXCI6IFtcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRTdHlsZS5jc3NcIixcbiAgICAgICAgICAgICAgICBcImRldi1pY29uLTEyOC5wbmdcIixcbiAgICAgICAgICAgICAgICBcImRldi1pY29uLTMyLnBuZ1wiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJtYXRjaGVzXCI6IFtdXG4gICAgICAgIH1cbiAgICBdXG59XG4iLCAie1xyXG4gICAgXCJuYW1lXCI6IFwidml0ZS13ZWItZXh0ZW5zaW9uXCIsXHJcbiAgICBcInZlcnNpb25cIjogXCIyLjBcIixcclxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBIHNpbXBsZSBjaHJvbWUgZXh0ZW5zaW9uIHRlbXBsYXRlIHdpdGggVml0ZSwgUmVhY3QsIFR5cGVTY3JpcHQgYW5kIFRhaWx3aW5kIENTUy5cIixcclxuICAgIFwibGljZW5zZVwiOiBcIk1JVFwiLFxyXG4gICAgXCJyZXBvc2l0b3J5XCI6IHtcclxuICAgICAgICBcInR5cGVcIjogXCJnaXRcIixcclxuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9IZXJvYnJlYWQvYmV0dGVyLXN0dWRyZXMtdjJcIlxyXG4gICAgfSxcclxuICAgIFwic2NyaXB0c1wiOiB7XHJcbiAgICAgICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcclxuICAgICAgICBcImRldlwiOiBcIm5vZGVtb25cIixcclxuICAgICAgICBcImZvcm1hdFwiOiBcInlhcm4gcHJldHRpZXIgLiAtLXdyaXRlXCJcclxuICAgIH0sXHJcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICAgIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgICAgICBcIkBob29rZm9ybS9yZXNvbHZlcnNcIjogXCJeMy4zLjRcIixcclxuICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1jb250ZXh0LW1lbnVcIjogXCJeMi4xLjVcIixcclxuICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1kaWFsb2dcIjogXCJeMS4wLjVcIixcclxuICAgICAgICBcIkByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51XCI6IFwiXjIuMC42XCIsXHJcbiAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtaG92ZXItY2FyZFwiOiBcIl4xLjAuN1wiLFxyXG4gICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWxhYmVsXCI6IFwiXjIuMC4yXCIsXHJcbiAgICAgICAgXCJAcmFkaXgtdWkvcmVhY3QtcG9wb3ZlclwiOiBcIl4xLjAuN1wiLFxyXG4gICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LXNlcGFyYXRvclwiOiBcIl4xLjAuM1wiLFxyXG4gICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LXNsb3RcIjogXCJeMS4wLjJcIixcclxuICAgICAgICBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiOiBcIl41LjMyLjFcIixcclxuICAgICAgICBcImNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eVwiOiBcIl4wLjcuMFwiLFxyXG4gICAgICAgIFwiY2xzeFwiOiBcIl4yLjEuMFwiLFxyXG4gICAgICAgIFwiY21ka1wiOiBcIl4xLjAuMFwiLFxyXG4gICAgICAgIFwibHVjaWRlLXJlYWN0XCI6IFwiXjAuMzY1LjBcIixcclxuICAgICAgICBcInJlYWN0XCI6IFwiXjE4LjIuMFwiLFxyXG4gICAgICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjIuMFwiLFxyXG4gICAgICAgIFwicmVhY3QtaG9vay1mb3JtXCI6IFwiXjcuNTEuM1wiLFxyXG4gICAgICAgIFwidGFpbHdpbmQtbWVyZ2VcIjogXCJeMi4yLjJcIixcclxuICAgICAgICBcInRhaWx3aW5kY3NzLWFuaW1hdGVcIjogXCJeMS4wLjdcIixcclxuICAgICAgICBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEwLjBcIixcclxuICAgICAgICBcInpvZFwiOiBcIl4zLjIzLjZcIlxyXG4gICAgfSxcclxuICAgIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgICAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIl4xLjAuMTRcIixcclxuICAgICAgICBcIkB0YW5zdGFjay9lc2xpbnQtcGx1Z2luLXF1ZXJ5XCI6IFwiXjUuMzIuMVwiLFxyXG4gICAgICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjUzXCIsXHJcbiAgICAgICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xNy4xXCIsXHJcbiAgICAgICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMi4zOVwiLFxyXG4gICAgICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4yLjE3XCIsXHJcbiAgICAgICAgXCJAdHlwZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiLFxyXG4gICAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNS40OS4wXCIsXHJcbiAgICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNDkuMFwiLFxyXG4gICAgICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI6IFwiXjMuMC4xXCIsXHJcbiAgICAgICAgXCJlc2xpbnRcIjogXCJeOC4zMi4wXCIsXHJcbiAgICAgICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjguNi4wXCIsXHJcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIl4yLjI3LjVcIixcclxuICAgICAgICBcImVzbGludC1wbHVnaW4tanN4LWExMXlcIjogXCJeNi43LjFcIixcclxuICAgICAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeNy4zMi4xXCIsXHJcbiAgICAgICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuMy4wXCIsXHJcbiAgICAgICAgXCJmcy1leHRyYVwiOiBcIl4xMS4xLjBcIixcclxuICAgICAgICBcIm5vZGVtb25cIjogXCJeMy4xLjBcIixcclxuICAgICAgICBcInBvc3Rjc3NcIjogXCJeOC40LjM4XCIsXHJcbiAgICAgICAgXCJwcmV0dGllclwiOiBcIjMuMi41XCIsXHJcbiAgICAgICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjQuM1wiLFxyXG4gICAgICAgIFwidHMtbm9kZVwiOiBcIl4xMC45LjFcIixcclxuICAgICAgICBcInR5cGVzY3JpcHRcIjogXCJeNC45LjRcIixcclxuICAgICAgICBcInZpdGVcIjogXCJeNC41LjBcIlxyXG4gICAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVcsT0FBTyxXQUFXO0FBQ3JYLFNBQVMsZUFBZTtBQUN4QixPQUFPLFFBQVE7QUFDZixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLFdBQTZCOzs7QUNKdEM7QUFBQSxFQUNJLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFFBQVU7QUFBQSxJQUNOLGVBQWlCO0FBQUEsSUFDakIsY0FBZ0I7QUFBQSxNQUNaLE1BQU07QUFBQSxJQUNWO0FBQUEsRUFDSjtBQUFBLEVBQ0EsT0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNBLGFBQWUsQ0FBQyxTQUFTO0FBQUEsRUFDekIsaUJBQW1CO0FBQUEsSUFDZjtBQUFBLE1BQ0ksU0FBVyxDQUFDLHVDQUF1QztBQUFBLE1BQ25ELElBQU0sQ0FBQyw2QkFBNkI7QUFBQSxNQUNwQyxLQUFPLENBQUMsa0JBQWtCO0FBQUEsSUFDOUI7QUFBQSxFQUNKO0FBQUEsRUFDQSwwQkFBNEI7QUFBQSxJQUN4QjtBQUFB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
