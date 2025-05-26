import {
    fileExtensionToShikiLangMap,
    SupportedShikiFileFormats,
} from "@src/constants/fileExtensionToShikiLangMap"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { FileContent, splitFileName } from "@src/features/parser"
import { FileBackButton } from "@src/features/tools/FileBackButton"
import { FilePreviewToolbar } from "@src/features/tools/FilePreviewToolbar"
import { highlighter } from "@src/pages/content"

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
            <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="min-h-screen w-max min-w-full bg-[#24292e] p-4 pb-20"
            />
            <FilePreviewToolbar />
        </>
    )
}
