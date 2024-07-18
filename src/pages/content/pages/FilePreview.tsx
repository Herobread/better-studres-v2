import { FileContent } from "@src/features/parser"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export function FilePreview({ content }: { content: FileContent }) {
    return (
        <>
            <SyntaxHighlighter
                language="java"
                wrapLongLines
                showLineNumbers
                style={vscDarkPlus}
            >
                {content.text}
            </SyntaxHighlighter>
        </>
    )
}
