import { FileContent } from "@src/features/parser"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

export function FilePreview({ content }: { content: FileContent }) {
    return (
        <>
            <SyntaxHighlighter
                wrapLongLines
                showLineNumbers
                style={atomOneDark}
            >
                {content.text}
            </SyntaxHighlighter>
        </>
    )
}
