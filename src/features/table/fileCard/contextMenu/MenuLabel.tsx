import { ContextMenuLabel } from "@src/components/ui/context-menu"
import { FileSize } from "@src/features/parser"

interface MenuLabelProps {
    fullName: string
    size?: FileSize
    description: string
}

export function MenuLabel({ fullName, size, description }: MenuLabelProps) {
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
            <p className="text-sm text-muted-foreground">{description}</p>
        </ContextMenuLabel>
    )
}
