import { Dialog, DialogContent } from "@src/components/ui/dialog"

interface TagFileMenuDialogProps {
    open: boolean
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export function TagFileMenuDialog({
    open,
    onOpenChange,
}: TagFileMenuDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>cheese</DialogContent>
        </Dialog>
    )
}
