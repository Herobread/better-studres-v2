import {
    fileExtensionToShikiLangMap,
    SupportedShikiFileFormats,
} from "@src/constants/fileExtensionToShikiLangMap"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { FileContent } from "@src/features/parser"
import { FileBackButton } from "@src/features/tools/FileBackButton"
import { FilePreviewToolbar } from "@src/features/tools/FilePreviewToolbar"
import { cn } from "@src/lib/utils"
import { highlighter } from "@src/pages/content"
import Markdown from "react-markdown"

export function MarkdownPreview({ content }: { content: FileContent }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <CommandsShortcutMount />
            <FileBackButton />
            <div className="prose mx-auto max-w-prose py-12 dark:prose-invert ">
                <Markdown
                    components={{
                        code(props) {
                            const { children, className } = props

                            const childrenString = String(children)

                            const extensionResults = /language-(\w+)/.exec(
                                className || ""
                            )
                            const extension = extensionResults
                                ? extensionResults[1]
                                : ""

                            const isMultiline =
                                childrenString.match(/\n$/) !== null

                            if (!isMultiline) {
                                return (
                                    <code
                                        className={cn(
                                            className,
                                            "not-prose rounded-sm bg-muted p-1 font-mono"
                                        )}
                                    >
                                        {children}
                                    </code>
                                )
                            }

                            const lang =
                                fileExtensionToShikiLangMap[
                                    extension as SupportedShikiFileFormats
                                ] || "plaintext"

                            const html = highlighter.codeToHtml(
                                childrenString,
                                {
                                    lang,
                                    theme: "github-dark",
                                }
                            )

                            return (
                                <code
                                    className={cn(className, "not-prose")}
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
                            )
                        },
                    }}
                >
                    {content.text}
                </Markdown>
            </div>
            <FilePreviewToolbar />
        </div>
    )
}
