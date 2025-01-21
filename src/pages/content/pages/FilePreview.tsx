import {
    fileExtensionToShikiLangMap,
    SupportedShikiFileFormats,
} from "@src/constants/fileExtensionToShikiLangMap"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { FileContent, splitFileName } from "@src/features/parser"
import { useQuery } from "@tanstack/react-query"
import { codeToHtml } from "shiki"

export function FilePreview({ content }: { content: FileContent }) {
    const extension = (
        splitFileName(window.location.toString()).extension || ""
    ).toLowerCase()
    const lang =
        fileExtensionToShikiLangMap[extension as SupportedShikiFileFormats] ||
        "plaintext"

    const { data: html } = useQuery({
        queryFn: async () =>
            codeToHtml(content.text, {
                lang,
                theme: "github-dark",
            }),
        queryKey: [window.location],
    })

    return (
        <>
            <CommandsShortcutMount />
            <div className="w-full">
                <div
                    dangerouslySetInnerHTML={{ __html: html || "Loading..." }}
                    className="w-max min-w-full"
                />
            </div>
        </>
    )
}
