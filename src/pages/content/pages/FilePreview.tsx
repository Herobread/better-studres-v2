import {
    fileExtensionToShikiLangMap,
    SupportedShikiFileFormats,
} from "@src/constants/fileExtensionToShikiLangMap"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { generateFileTitle } from "@src/features/head"
import { FileContent, splitFileName } from "@src/features/parser"
import { FileBackButton } from "@src/features/tools/FileBackButton"
import { FilePreviewToolbar } from "@src/features/tools/FilePreviewToolbar"
import { highlighter } from "@src/pages/content"
import { Helmet } from "react-helmet-async"
import { useFont, useTheme, THEME_CONFIG } from "@src/features/theme"

export function FilePreview({ content }: { content: FileContent }) {
    const { fontFamily } = useFont()
    const { actualTheme } = useTheme()

    const isDark = THEME_CONFIG[actualTheme].type === "dark"

    const extension = (
        splitFileName(window.location.toString()).extension || ""
    ).toLowerCase()
    const lang =
        fileExtensionToShikiLangMap[extension as SupportedShikiFileFormats] ||
        "plaintext"

    const html = highlighter.codeToHtml(content.text, {
        lang,
        theme: isDark ? "github-dark" : "github-light",
    })

    const url = location.href.toString()

    // The following styles are for line numbering.
    // This approach is used because CSS counters are
    // not directly supported by Tailwind CSS and shiki.js
    //
    // shiki.js generates HTML structure that requires
    // these specific CSS rules to target the code lines for numbering.
    //
    // https://github.com/shikijs/shiki/issues/3
    const codeLineNumberingStyles = `
      .code-container code {
        counter-reset: step;
        counter-increment: step 0;
        ${
            fontFamily === "fira"
                ? "font-family: 'Fira Code', monospace !important;"
                : fontFamily !== "default"
                  ? `font-family: '${fontFamily}', sans-serif !important;`
                  : ""
        }
      }

      .code-container code .line::before {
        content: counter(step);
        counter-increment: step;
        width: 1rem;
        margin-right: 1.5rem;
        display: inline-block;
        text-align: right;
        color: #9097A0;
      }
    `

    return (
        <>
            <Helmet>
                <title>{generateFileTitle(url)}</title>
            </Helmet>
            <CommandsShortcutMount />
            <FileBackButton />
            <style>{codeLineNumberingStyles}</style>
            <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="code-container min-h-screen w-max min-w-full bg-[#24292e] p-4 pb-20"
            />
            <FilePreviewToolbar />
        </>
    )
}
