import { Dialog, DialogContent, DialogHeader } from "@src/components/ui/dialog"
import { FileLink } from "@src/types/pageContentTypes"

interface TagFileMenuDialogProps {
    open: boolean
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
    fileLink: FileLink
}

export function TagFileMenuDialog({
    open,
    onOpenChange,
    fileLink,
}: TagFileMenuDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>Add tag to {fileLink.name}</DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
