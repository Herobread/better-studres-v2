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
import { ScrollArea } from "@src/components/ui/scroll-area"
import { Separator } from "@src/components/ui/separator"
import {
    GET_TOTAL_TAGGED_FILES_MAP_QUERY_KEY,
    getTotalTaggedFilesMap,
} from "@src/features/files/tags/stats"
import { TAGS_QUERY_KEY, getTags } from "@src/features/files/tags/storage"
import AddNewTagDialog from "@src/features/shared/dialogs/tags/AddNewTagDialog"
import { useQuery } from "@tanstack/react-query"
import { Fragment } from "react/jsx-runtime"
import { ManageTagCard } from "./ManageTagCard"

export default NiceModal.create(() => {
    const modalHandler = useModal()

    const { data: tags } = useQuery({
        queryKey: [TAGS_QUERY_KEY],
        queryFn: getTags,
    })

    const { data: stats } = useQuery({
        queryKey: [TAGS_QUERY_KEY, GET_TOTAL_TAGGED_FILES_MAP_QUERY_KEY],
        queryFn: getTotalTaggedFilesMap,
    })

    const handleClose = () => {
        modalHandler.hide()
    }

    const handleCreateNewTag = () => {
        modalHandler.hide()
        NiceModal.show(AddNewTagDialog)
    }

    return (
        <Dialog handler={modalHandler}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage tags</DialogTitle>
                    <DialogDescription>
                        Rename or delete tags and view their usage.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-96">
                    {tags && tags.length > 0 ? (
                        tags.map((tag, i) => {
                            const { id } = tag

                            return (
                                <Fragment key={id}>
                                    <ManageTagCard
                                        tag={tag}
                                        files={stats && stats[id]}
                                    />
                                    {i < tags.length - 1 && <Separator />}
                                </Fragment>
                            )
                        })
                    ) : (
                        <p>
                            No tags found. Create tags to organize related files
                        </p>
                    )}
                </ScrollArea>
                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <Button variant={"outline"} onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleCreateNewTag}>Create new Tag</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})
