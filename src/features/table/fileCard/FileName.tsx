import { FullFileLink } from "@src/features/parser"

interface FileNameProps {
    fileLink: FullFileLink
    showExtension: boolean
}

export function FileName({ fileLink, showExtension }: FileNameProps) {
    const { fullName, name } = fileLink

    let content = name

    if (showExtension) {
        content = fullName
    }

    return <span className="font-bold">{content}</span>
}
