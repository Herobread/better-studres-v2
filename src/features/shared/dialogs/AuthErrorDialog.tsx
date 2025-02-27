import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { Button } from "@src/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@src/components/ui/dialog"

export default NiceModal.create(() => {
    const modalHandler = useModal()

    const handleClose = () => {
        modalHandler.hide()
    }

    return (
        <Dialog handler={modalHandler}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>AuthError</DialogTitle>
                    <DialogDescription>Auth Required</DialogDescription>
                </DialogHeader>
                <p>
                    When navigating: Studres redirects to the login page, which
                    may cause login page to appear. Which is ok, but:
                </p>
                <p>
                    When searching, it blocks results from loading, so you need
                    to manually trigger login.
                </p>
                <p>
                    Unfortunately it cannot be fixed without accessing the login
                    page itself (And I don{"`"}t really want extension to have
                    access to microsoft.login)
                </p>
                <DialogFooter>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})
