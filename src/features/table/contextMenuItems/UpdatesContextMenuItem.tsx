import { ContextMenuItem } from "@src/components/ui/context-menu"
import { GitCompareArrowsIcon } from "lucide-react"

interface UpdatesContextMenuItemProps {
    isVersionHistoryAvailable: boolean
    setIsViewUpdatesDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function UpdatesContextMenuItem({
    isVersionHistoryAvailable,
    setIsViewUpdatesDialogOpen,
}: UpdatesContextMenuItemProps) {
    return (
        <ContextMenuItem
            onSelect={() => {
                setIsViewUpdatesDialogOpen(true)
            }}
            disabled={!isVersionHistoryAvailable}
        >
            <GitCompareArrowsIcon /> View update history
        </ContextMenuItem>
    )
}
