import {
    fileExtensionToShikiLangMap,
    SupportedShikiFileFormats,
} from "@src/constants/fileExtensionToShikiLangMap"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { FileContent, splitFileName } from "@src/features/parser"
import { FileBackButton } from "@src/features/tools/FileBackButton"
import { FilePreviewToolbar } from "@src/features/tools/FilePreviewToolbar"
import { highlighter } from "@src/pages/content"

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

export function FilePreview({ content }: { content: FileContent }) {
    const extension = (
        splitFileName(window.location.toString()).extension || ""
    ).toLowerCase()
    const lang =
        fileExtensionToShikiLangMap[extension as SupportedShikiFileFormats] ||
        "plaintext"

    const html = highlighter.codeToHtml(content.text, {
        lang,
        theme: "github-dark",
    })

    return (
        <>
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
