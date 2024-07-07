import { ContextMenuLabel } from "@src/components/ui/context-menu"
import { FileSize } from "@src/features/parser"

interface MenuLabelProps {
    fullName: string
    size?: FileSize
    fileKey: string
}

export function MenuLabel({ fullName, size, fileKey }: MenuLabelProps) {
    return (
        <ContextMenuLabel>
            <div className="flex gap-1">
                <p>{fullName}</p>
                {size && (
                    <span className="text-muted-foreground">
                        {size.value}
                        {size.measure}
                    </span>
                )}
            </div>
            <p className="text-sm text-muted-foreground">{fileKey}</p>
        </ContextMenuLabel>
    )
}
