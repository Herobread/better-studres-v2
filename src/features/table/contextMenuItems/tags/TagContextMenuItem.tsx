import { ContextMenuItem } from "@src/components/ui/context-menu"
import { cn } from "@src/lib/utils"

interface TagContextMenuItemProps
    extends React.ComponentPropsWithoutRef<typeof ContextMenuItem> {
    icon: string
    name: string
}

export function TagContextMenuItem({
    icon,
    name,
    className,
    ...props
}: TagContextMenuItemProps) {
    return (
        <ContextMenuItem
            className={cn("grid grid-cols-[20px_1fr] gap-1", className)}
            {...props}
        >
            <p className="text-center">{icon}</p>
            <p>{name}</p>
        </ContextMenuItem>
    )
}
