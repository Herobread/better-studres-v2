import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { FileContent } from "@src/features/parser"
import { useTheme } from "@src/features/theme"
import SyntaxHighlighter from "react-syntax-highlighter"
import {
    atomOneDark,
    atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs"

export function FilePreview({ content }: { content: FileContent }) {
    const { actualTheme } = useTheme()

    return (
        <>
            <CommandsShortcutMount />
            <SyntaxHighlighter
                wrapLongLines
                showLineNumbers
                style={actualTheme === "dark" ? atomOneDark : atomOneLight}
            >
                {content.text}
            </SyntaxHighlighter>
        </>
    )
}
