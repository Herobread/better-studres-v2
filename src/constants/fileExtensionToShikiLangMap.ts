export type SupportedShikiFileFormats =
    | "java"
    | "css"
    | "sh"
    | "js"
    | "jsx"
    | "ts"
    | "tsx"
    | "py"
    | "pl"
    | "hs"
    | "h"
    | "c"
    | "cc"
    | "cpp"
    | "mjs"
    | "ipynb"
    | "r"
    | "rs"

export const fileExtensionToShikiLangMap: Record<
    SupportedShikiFileFormats,
    string
> = {
    java: "java",
    css: "css",
    sh: "shellscript",
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    py: "python",
    pl: "perl",
    hs: "haskell",
    h: "c",
    c: "c",
    cc: "cpp",
    cpp: "cpp",
    mjs: "javascript",
    ipynb: "python",
    r: "r",
    rs: "rust",
}

/**
 * check if format is supported before converting it to the shiki naming scheme
 */
export function isFileFormatShikiSupported(format: string) {
    return Object.keys(fileExtensionToShikiLangMap).includes(format)
}

export function getShikiLanguage(extension: string): string {
    return (
        fileExtensionToShikiLangMap[extension as SupportedShikiFileFormats] ||
        "plaintext"
    )
}
