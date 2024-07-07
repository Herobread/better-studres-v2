import { FileSize } from "@src/features/parser"

interface FileSizeProps {
    size?: FileSize
}

export function FileSize({ size }: FileSizeProps) {
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
