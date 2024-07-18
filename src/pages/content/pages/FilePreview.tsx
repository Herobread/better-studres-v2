import { FileContent } from "@src/features/parser"

export function FilePreview({ content }: { content: FileContent }) {
    return (
        <>
            <h1>hello world</h1>
            <pre className="whitespace-pre-wrap break-words">
                {content.text}
            </pre>
        </>
    )
}
