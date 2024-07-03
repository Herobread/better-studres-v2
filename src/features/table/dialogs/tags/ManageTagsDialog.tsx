import { Dialog, DialogContent } from "@src/components/ui/dialog"

interface ManageTagsDialogProps {
    open: boolean
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export function ManageTagsDialog({
    onOpenChange,
    open,
}: ManageTagsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>Manage tags</DialogContent>
        </Dialog>
    )
}
