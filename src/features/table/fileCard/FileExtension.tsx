interface FileExtensionProps {
    extension?: string
}

export function FileExtension({ extension }: FileExtensionProps) {
    if (!extension) {
        return null
    }

    return <div className="text-center font-mono leading-5">{extension}</div>
}
