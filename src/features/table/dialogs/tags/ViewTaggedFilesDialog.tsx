import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@src/components/ui/dialog"
import { ScrollArea } from "@src/components/ui/scroll-area"
import { Tag } from "@src/features/files/tags/storage"

interface ViewTaggedFilesDialogProps {
    open: boolean
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
    tag: Tag
}

export function ViewTaggedFilesDialog({
    onOpenChange,
    open,
    tag,
}: ViewTaggedFilesDialogProps) {
    const { id, name } = tag
    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Files tagged {name}</DialogTitle>
                    <DialogDescription id="dialog-description">
                        Files tagged {name}
                    </DialogDescription>
                    <ScrollArea className="max-h-96">cheese</ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
