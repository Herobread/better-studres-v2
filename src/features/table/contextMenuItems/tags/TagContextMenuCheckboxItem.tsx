import { ContextMenuCheckboxItem } from "@src/components/ui/context-menu"
import { cn } from "@src/lib/utils"

interface TagContextMenuCheckboxItemProps
    extends React.ComponentPropsWithoutRef<typeof ContextMenuCheckboxItem> {
    icon: string
    name: string
}

export function TagContextMenuCheckboxItem({
    icon,
    name,
    className,
    ...props
}: TagContextMenuCheckboxItemProps) {
    return (
        <ContextMenuCheckboxItem
            className={cn("grid grid-cols-[20px_1fr] gap-1", className)}
            {...props}
        >
            <p className="text-center">{icon}</p>
            <p>{name}</p>
        </ContextMenuCheckboxItem>
    )
}
