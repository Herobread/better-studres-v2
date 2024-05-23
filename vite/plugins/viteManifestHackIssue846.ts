import { Plugin } from "vite"

// Workaround from https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919.
export const viteManifestHackIssue846: Plugin & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderCrxManifest: (manifest: any, bundle: any) => void
} = {
    name: "manifestHackIssue846",
    renderCrxManifest(_manifest, bundle) {
        bundle["manifest.json"] = bundle[".vite/manifest.json"]
        bundle["manifest.json"].fileName = "manifest.json"
        delete bundle[".vite/manifest.json"]
    },
}
