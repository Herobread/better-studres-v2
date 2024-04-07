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
    react: "^18.2.0",
    "react-dom": "^18.2.0",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4ZVxcXFx2c2NvZGVcXFxcZXh0ZW5zaW9uc1xcXFxiZXR0ZXItc3R1ZHJlcy12Mi1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbGV4ZVxcXFx2c2NvZGVcXFxcZXh0ZW5zaW9uc1xcXFxiZXR0ZXItc3R1ZHJlcy12Mi1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbGV4ZS92c2NvZGUvZXh0ZW5zaW9ucy9iZXR0ZXItc3R1ZHJlcy12Mi1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IGNyeCwgTWFuaWZlc3RWM0V4cG9ydCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcblxuaW1wb3J0IG1hbmlmZXN0IGZyb20gXCIuL21hbmlmZXN0Lmpzb25cIjtcbmltcG9ydCBkZXZNYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5kZXYuanNvblwiO1xuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcblxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKTtcbmNvbnN0IHBhZ2VzRGlyID0gcmVzb2x2ZShyb290LCBcInBhZ2VzXCIpO1xuY29uc3QgYXNzZXRzRGlyID0gcmVzb2x2ZShyb290LCBcImFzc2V0c1wiKTtcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcImRpc3RcIik7XG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJwdWJsaWNcIik7XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gXCJ0cnVlXCI7XG5cbmNvbnN0IGV4dGVuc2lvbk1hbmlmZXN0ID0ge1xuICAgIC4uLm1hbmlmZXN0LFxuICAgIC4uLihpc0RldiA/IGRldk1hbmlmZXN0IDogKHt9IGFzIE1hbmlmZXN0VjNFeHBvcnQpKSxcbiAgICBuYW1lOiBpc0RldiA/IGBERVY6ICR7bWFuaWZlc3QubmFtZX1gIDogbWFuaWZlc3QubmFtZSxcbiAgICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcbn07XG5cbi8vIHBsdWdpbiB0byByZW1vdmUgZGV2IGljb25zIGZyb20gcHJvZCBidWlsZFxuZnVuY3Rpb24gc3RyaXBEZXZJY29ucyhhcHBseTogYm9vbGVhbikge1xuICAgIGlmIChhcHBseSkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBcInN0cmlwLWRldi1pY29uc1wiLFxuICAgICAgICByZXNvbHZlSWQoc291cmNlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UgPT09IFwidmlydHVhbC1tb2R1bGVcIiA/IHNvdXJjZSA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlclN0YXJ0KG91dHB1dE9wdGlvbnM6IGFueSwgaW5wdXRPcHRpb25zOiBhbnkpIHtcbiAgICAgICAgICAgIGNvbnN0IG91dERpciA9IG91dHB1dE9wdGlvbnMuZGlyO1xuICAgICAgICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMzIucG5nXCIpLCAoKSA9PlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGRldi1pY29uLTMyLnBuZyBmcm0gcHJvZCBidWlsZGApLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGZzLnJtKHJlc29sdmUob3V0RGlyLCBcImRldi1pY29uLTEyOC5wbmdcIiksICgpID0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERlbGV0ZWQgZGV2LWljb24tMTI4LnBuZyBmcm0gcHJvZCBidWlsZGApLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgIFwiQHNyY1wiOiByb290LFxuICAgICAgICAgICAgXCJAYXNzZXRzXCI6IGFzc2V0c0RpcixcbiAgICAgICAgICAgIFwiQHBhZ2VzXCI6IHBhZ2VzRGlyLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgICAgICBjcngoe1xuICAgICAgICAgICAgbWFuaWZlc3Q6IGV4dGVuc2lvbk1hbmlmZXN0IGFzIE1hbmlmZXN0VjNFeHBvcnQsXG4gICAgICAgICAgICBjb250ZW50U2NyaXB0czoge1xuICAgICAgICAgICAgICAgIGluamVjdENzczogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgICBzdHJpcERldkljb25zKGlzRGV2KSxcbiAgICBdLFxuICAgIHB1YmxpY0RpcixcbiAgICBidWlsZDoge1xuICAgICAgICBvdXREaXIsXG4gICAgICAgIHNvdXJjZW1hcDogaXNEZXYsXG4gICAgICAgIGVtcHR5T3V0RGlyOiAhaXNEZXYsXG4gICAgfSxcbn0pO1xuIiwgIntcbiAgICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcbiAgICBcIm5hbWVcIjogXCJCZXR0ZXIgU3R1ZHJlc1wiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGlzIGlzIGFuIGV4dGVuc2lvbiB0byBpbXByb3ZlIHN0dWRyZXMgYXBwZWFyZW5jZS5cIixcbiAgICBcImFjdGlvblwiOiB7XG4gICAgICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInNyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sXCIsXG4gICAgICAgIFwiZGVmYXVsdF9pY29uXCI6IHtcbiAgICAgICAgICAgIFwiMzJcIjogXCJpY29uLTMyLnBuZ1wiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiaWNvbnNcIjoge1xuICAgICAgICBcIjEyOFwiOiBcImljb24tMTI4LnBuZ1wiXG4gICAgfSxcbiAgICBcInBlcm1pc3Npb25zXCI6IFtcInN0b3JhZ2VcIl0sXG4gICAgXCJjb250ZW50X3NjcmlwdHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcIm1hdGNoZXNcIjogW1wiaHR0cHM6Ly9zdHVkcmVzLmNzLnN0LWFuZHJld3MuYWMudWsvKlwiXSxcbiAgICAgICAgICAgIFwianNcIjogW1wic3JjL3BhZ2VzL2NvbnRlbnQvaW5kZXgudHN4XCJdLFxuICAgICAgICAgICAgXCJjc3NcIjogW1wiY29udGVudFN0eWxlLmNzc1wiXVxuICAgICAgICB9XG4gICAgXSxcbiAgICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicmVzb3VyY2VzXCI6IFtcImNvbnRlbnRTdHlsZS5jc3NcIiwgXCJpY29uLTEyOC5wbmdcIiwgXCJpY29uLTMyLnBuZ1wiXSxcbiAgICAgICAgICAgIFwibWF0Y2hlc1wiOiBbXVxuICAgICAgICB9XG4gICAgXVxufVxuIiwgIntcbiAgICBcImFjdGlvblwiOiB7XG4gICAgICAgIFwiZGVmYXVsdF9pY29uXCI6IFwicHVibGljL2Rldi1pY29uLTMyLnBuZ1wiLFxuICAgICAgICBcImRlZmF1bHRfcG9wdXBcIjogXCJzcmMvcGFnZXMvcG9wdXAvaW5kZXguaHRtbFwiXG4gICAgfSxcbiAgICBcImljb25zXCI6IHtcbiAgICAgICAgXCIxMjhcIjogXCJwdWJsaWMvZGV2LWljb24tMTI4LnBuZ1wiXG4gICAgfSxcbiAgICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicmVzb3VyY2VzXCI6IFtcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRTdHlsZS5jc3NcIixcbiAgICAgICAgICAgICAgICBcImRldi1pY29uLTEyOC5wbmdcIixcbiAgICAgICAgICAgICAgICBcImRldi1pY29uLTMyLnBuZ1wiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJtYXRjaGVzXCI6IFtdXG4gICAgICAgIH1cbiAgICBdXG59XG4iLCAie1xuICAgIFwibmFtZVwiOiBcInZpdGUtd2ViLWV4dGVuc2lvblwiLFxuICAgIFwidmVyc2lvblwiOiBcIjIuMFwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBIHNpbXBsZSBjaHJvbWUgZXh0ZW5zaW9uIHRlbXBsYXRlIHdpdGggVml0ZSwgUmVhY3QsIFR5cGVTY3JpcHQgYW5kIFRhaWx3aW5kIENTUy5cIixcbiAgICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgICBcInJlcG9zaXRvcnlcIjoge1xuICAgICAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vSGVyb2JyZWFkL2JldHRlci1zdHVkcmVzLXYyXCJcbiAgICB9LFxuICAgIFwic2NyaXB0c1wiOiB7XG4gICAgICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgICAgIFwiZGV2XCI6IFwibm9kZW1vblwiLFxuICAgICAgICBcImZvcm1hdFwiOiBcInlhcm4gcHJldHRpZXIgLiAtLXdyaXRlXCJcbiAgICB9LFxuICAgIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICAgIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICAgICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICAgICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgICAgIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiXG4gICAgfSxcbiAgICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjEuMC4xNFwiLFxuICAgICAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI1M1wiLFxuICAgICAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE4LjE3LjFcIixcbiAgICAgICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMi4zOVwiLFxuICAgICAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4xN1wiLFxuICAgICAgICBcIkB0eXBlcy93ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMC4wXCIsXG4gICAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNS40OS4wXCIsXG4gICAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl41LjQ5LjBcIixcbiAgICAgICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjogXCJeMy4wLjFcIixcbiAgICAgICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xNlwiLFxuICAgICAgICBcImVzbGludFwiOiBcIl44LjMyLjBcIixcbiAgICAgICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjguNi4wXCIsXG4gICAgICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yNy41XCIsXG4gICAgICAgIFwiZXNsaW50LXBsdWdpbi1qc3gtYTExeVwiOiBcIl42LjcuMVwiLFxuICAgICAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeNy4zMi4xXCIsXG4gICAgICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjMuMFwiLFxuICAgICAgICBcImZzLWV4dHJhXCI6IFwiXjExLjEuMFwiLFxuICAgICAgICBcIm5vZGVtb25cIjogXCJeMi4wLjIwXCIsXG4gICAgICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzFcIixcbiAgICAgICAgXCJwcmV0dGllclwiOiBcIjMuMi41XCIsXG4gICAgICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy4zLjVcIixcbiAgICAgICAgXCJ0cy1ub2RlXCI6IFwiXjEwLjkuMVwiLFxuICAgICAgICBcInR5cGVzY3JpcHRcIjogXCJeNC45LjRcIixcbiAgICAgICAgXCJ2aXRlXCI6IFwiXjQuNS4wXCJcbiAgICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1XLE9BQU8sV0FBVztBQUNyWCxTQUFTLGVBQWU7QUFDeEIsT0FBTyxRQUFRO0FBQ2YsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxXQUE2Qjs7O0FDSnRDO0FBQUEsRUFDSSxrQkFBb0I7QUFBQSxFQUNwQixNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixRQUFVO0FBQUEsSUFDTixlQUFpQjtBQUFBLElBQ2pCLGNBQWdCO0FBQUEsTUFDWixNQUFNO0FBQUEsSUFDVjtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxFQUNYO0FBQUEsRUFDQSxhQUFlLENBQUMsU0FBUztBQUFBLEVBQ3pCLGlCQUFtQjtBQUFBLElBQ2Y7QUFBQSxNQUNJLFNBQVcsQ0FBQyx1Q0FBdUM7QUFBQSxNQUNuRCxJQUFNLENBQUMsNkJBQTZCO0FBQUEsTUFDcEMsS0FBTyxDQUFDLGtCQUFrQjtBQUFBLElBQzlCO0FBQUEsRUFDSjtBQUFBLEVBQ0EsMEJBQTRCO0FBQUEsSUFDeEI7QUFBQSxNQUNJLFdBQWEsQ0FBQyxvQkFBb0IsZ0JBQWdCLGFBQWE7QUFBQSxNQUMvRCxTQUFXLENBQUM7QUFBQSxJQUNoQjtBQUFBLEVBQ0o7QUFDSjs7O0FDM0JBO0FBQUEsRUFDSSxRQUFVO0FBQUEsSUFDTixjQUFnQjtBQUFBLElBQ2hCLGVBQWlCO0FBQUEsRUFDckI7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxF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
