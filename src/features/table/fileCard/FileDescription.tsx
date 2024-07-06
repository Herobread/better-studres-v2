import { FullFileLink } from "@src/features/parser"

interface FileDescriptionProps {
    fileLink: FullFileLink
}

export function FileDescription({ fileLink }: FileDescriptionProps) {
    const { description } = fileLink

    if (!description) {
        return null
    }

    return <div className="italic"> {description}</div>
}
