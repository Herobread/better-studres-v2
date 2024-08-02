interface FileNameProps {
    name: string
    fullName: string
    showExtension?: boolean
    isDownloading?: boolean
}

export function FileName({
    name,
    fullName,
    showExtension,
    isDownloading,
}: FileNameProps) {
    const content = showExtension ? fullName : name

    return (
        <span className="font-bold">
            {content}
            {isDownloading && <span className="animate-pulse"> 📥</span>}
        </span>
    )
}
