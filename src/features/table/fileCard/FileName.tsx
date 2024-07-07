interface FileNameProps {
    name: string
    fullName: string
    showExtension: boolean
}

export function FileName({ name, fullName, showExtension }: FileNameProps) {
    const content = showExtension ? fullName : name

    return <span className="font-bold">{content}</span>
}
