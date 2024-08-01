import NiceModal from "@ebay/nice-modal-react"
import {
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
} from "@src/components/ui/context-menu"
import {
    deleteQuickLink,
    GET_QUICK_LINKS_QUERY_KEY,
    moveQuickLink,
    QuickLink,
} from "@src/features/quickLinks/storage"
import CopyTextMenuItem from "@src/features/shared/contextMenuItems/CopyTextMenuItem"
import EditQuickLinkDialog from "@src/features/shared/dialogs/EditQuickLinkDialog"
import { useQueryClient } from "@tanstack/react-query"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    Edit2Icon,
    PinOffIcon,
} from "lucide-react"
import { forwardRef } from "react"

export const QuickLinkContextMenuContent = forwardRef<
    HTMLDivElement,
    {
        quickLink: QuickLink
        isLast?: boolean
        isFirst?: boolean
    }
>(({ quickLink, isFirst, isLast }, ref) => {
    const handleEditQuickLink = () => {
        NiceModal.show(EditQuickLinkDialog, { quickLink })
    }

    const queryClient = useQueryClient()

    const invalidateAndRefetchQuickLinks = async () => {
        await queryClient.invalidateQueries({
            queryKey: [GET_QUICK_LINKS_QUERY_KEY],
        })
        await queryClient.refetchQueries({
            queryKey: [GET_QUICK_LINKS_QUERY_KEY],
        })
    }

    const handleRemoveQuickLink = async (id: number) => {
        await deleteQuickLink(id)
        await invalidateAndRefetchQuickLinks()
    }

    const handleMoveRight = async (id: number) => {
        await moveQuickLink(id, 1)
        await invalidateAndRefetchQuickLinks()
    }

    const handleMoveLeft = async (id: number) => {
        await moveQuickLink(id, -1)
        await invalidateAndRefetchQuickLinks()
    }

    return (
        <ContextMenuContent ref={ref}>
            <ContextMenuItem onSelect={handleEditQuickLink}>
                <Edit2Icon className="h-4 w-4" /> Edit
            </ContextMenuItem>
            <CopyTextMenuItem name="URL" textToCopy={quickLink.href} />
            <ContextMenuItem
                disabled={isLast}
                onSelect={async () => {
                    await handleMoveRight(quickLink.id)
                }}
            >
                <ChevronRightIcon className="h-4 w-4" /> Move right
            </ContextMenuItem>
            <ContextMenuItem
                disabled={isFirst}
                onSelect={async () => {
                    await handleMoveLeft(quickLink.id)
                }}
            >
                <ChevronLeftIcon className="h-4 w-4" /> Move left
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
                onSelect={async () => {
                    await handleRemoveQuickLink(quickLink.id)
                }}
            >
                <PinOffIcon className="h-4 w-4" /> Unpin
            </ContextMenuItem>
        </ContextMenuContent>
    )
})

QuickLinkContextMenuContent.displayName = "QuickLinkContextMenuContent"
