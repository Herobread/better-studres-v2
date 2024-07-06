import { FullFileLink } from "@src/features/parser"

interface FileSizeProps {
    fileLink: FullFileLink
}

export function FileSize({ fileLink }: FileSizeProps) {
    const { size } = fileLink

    if (!size) {
        return <div className="col-span-2"></div>
    }

    return (
        <>
            <div className="text-right">{size.value.toFixed(1)}</div>
            <div className="ml-[-8px]">{size.measure}</div>
        </>
    )
}
