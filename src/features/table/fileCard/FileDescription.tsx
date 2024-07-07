interface FileDescriptionProps {
    description?: string
}

export function FileDescription({ description }: FileDescriptionProps) {
    if (!description) {
        return null
    }

    return <div className="italic"> {description}</div>
}
