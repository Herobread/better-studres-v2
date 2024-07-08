import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { Dialog, DialogContent } from "@src/components/ui/dialog"
import { QuickLink } from "@src/types/quickLinkTypes"
import EditQuickLinkForm from "../quickAccess/EditQuickLinkForm"

export default NiceModal.create(({ quickLink }: { quickLink: QuickLink }) => {
    const modalHandler = useModal()

    return (
        <Dialog handler={modalHandler}>
            <DialogContent>
                <EditQuickLinkForm quickLink={quickLink} />
            </DialogContent>
        </Dialog>
    )
})
