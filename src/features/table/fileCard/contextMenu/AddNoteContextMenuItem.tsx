import NiceModal from "@ebay/nice-modal-react"
import { ContextMenuItem } from "@src/components/ui/context-menu"
import AddNoteDialog from "@src/features/shared/dialogs/AddNoteDialog"
import { StickyNoteIcon } from "lucide-react"

export function AddNoteContextMenuItem({ fileKey }: { fileKey: string }) {
    const onSelect = () => {
        NiceModal.show(AddNoteDialog, { fileKey })
    }

    return (
        <ContextMenuItem onSelect={onSelect}>
            <StickyNoteIcon className="h-4 w-4" /> Note
        </ContextMenuItem>
    )
}
