import fs from "fs"
import { resolve } from "path"

// plugin to remove dev icons from prod build
export function stripDevIcons(apply: boolean) {
    if (apply) return null

    return {
        name: "strip-dev-icons",
        resolveId(source: string) {
            return source === "virtual-module" ? source : null
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        renderStart(outputOptions: any, inputOptions: any) {
            const outDir = outputOptions.dir
            fs.rm(resolve(outDir, "dev-icon-32.png"), () =>
                console.log(`Deleted dev-icon-32.png from production build`)
            )
            fs.rm(resolve(outDir, "dev-icon-128.png"), () =>
                console.log(`Deleted dev-icon-128.png from production build`)
            )
        },
    }
}
