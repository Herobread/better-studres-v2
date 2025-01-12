import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { CommandDialog } from "@src/components/ui/command"
import { DialogDescription, DialogTitle } from "@src/components/ui/dialog"
import { Commands } from "@src/features/shared/dialogs/Commands"

export default NiceModal.create(() => {
    const modalHandler = useModal()

    return (
        <CommandDialog handler={modalHandler}>
            <VisuallyHidden>
                <DialogTitle>
                    <DialogDescription>Command dialog</DialogDescription>
                </DialogTitle>
            </VisuallyHidden>
            <Commands />
        </CommandDialog>
    )
})
