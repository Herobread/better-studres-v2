export type SupportedShikiFileFormats =
    | "java"
    | "jar"
    | "htm"
    | "html"
    | "css"
    | "sh"
    | "php"
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
    | "ppc64"
    | "st"
    | "idr"
    | "mjs"
    | "ipynb"
    | "r"
    | "rs"

export const fileExtensionToShikiLangMap: Record<
    SupportedShikiFileFormats,
    string
> = {
    java: "java",
    jar: "java",
    htm: "html",
    html: "html",
    css: "css",
    sh: "shellscript",
    php: "php",
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
    ppc64: "assembly",
    st: "plaintext",
    idr: "plaintext",
    mjs: "javascript",
    ipynb: "python",
    r: "r",
    rs: "rust",
}

export function getShikiLanguage(extension: string): string {
    return (
        fileExtensionToShikiLangMap[extension as SupportedShikiFileFormats] ||
        "plaintext"
    )
}
