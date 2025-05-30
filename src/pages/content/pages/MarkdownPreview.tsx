import {
    fileExtensionToShikiLangMap,
    SupportedShikiFileFormats,
} from "@src/constants/fileExtensionToShikiLangMap"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { generateFileTitle } from "@src/features/head"
import { FileContent } from "@src/features/parser"
import { useTheme } from "@src/features/theme"
import { FileBackButton } from "@src/features/tools/FileBackButton"
import { FilePreviewToolbar } from "@src/features/tools/FilePreviewToolbar"
import { cn } from "@src/lib/utils"
import { highlighter } from "@src/pages/content"
import { Helmet } from "react-helmet-async"
import Markdown from "react-markdown"
import githubDark from "shiki/themes/github-dark.mjs"
import githubLight from "shiki/themes/github-light.mjs"

const customGithubDark = { ...githubDark }
const customGithubLight = { ...githubLight }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function replaceColors(theme: any, colorMap: { [key: string]: string }) {
    if (!theme || !theme.colors) return

    for (const key in theme.colors) {
        if (colorMap[theme.colors[key]]) {
            theme.colors[key] = colorMap[theme.colors[key]]
        }
    }

    if (Array.isArray(theme.tokenColors)) {
        for (const token of theme.tokenColors) {
            if (
                token.settings &&
                token.settings.foreground &&
                colorMap[token.settings.foreground]
            ) {
                token.settings.foreground = colorMap[token.settings.foreground]
            }
            if (
                token.settings &&
                token.settings.background &&
                colorMap[token.settings.background]
            ) {
                token.settings.background = colorMap[token.settings.background]
            }
        }
    }
}

const darkColorRemap = {
    "#24292e": "transparent",
}

const lightColorRemap = {
    "#fff": "transparent",
}

export function MarkdownPreview({ content }: { content: FileContent }) {
    replaceColors(customGithubDark, darkColorRemap)
    replaceColors(customGithubLight, lightColorRemap)

    const { actualTheme } = useTheme()

    const url = location.href.toString()

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Helmet>
                <title>{generateFileTitle(url)}</title>
            </Helmet>
            <CommandsShortcutMount />
            <FileBackButton />
            <div className="prose mx-auto max-w-prose py-12 dark:prose-invert ">
                <Markdown
                    components={{
                        pre: ({ children }) => <>{children}</>,
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
                                    theme:
                                        actualTheme === "dark"
                                            ? customGithubDark
                                            : customGithubLight,
                                }
                            )

                            return (
                                <div
                                    className={cn(
                                        className,
                                        "not-prose rounded-sm bg-muted p-2"
                                    )}
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
