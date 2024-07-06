import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@src/components/ui/dialog"
import { ScrollArea } from "@src/components/ui/scroll-area"
import { Separator } from "@src/components/ui/separator"
import {
    GET_TOTAL_TAGGED_FILES_MAP_QUERY_KEY,
    getTotalTaggedFilesMap,
} from "@src/features/files/tags/stats"
import { TAGS_QUERY_KEY, Tag, getTags } from "@src/features/files/tags/storage"
import { useQuery } from "@tanstack/react-query"
import { Fragment } from "react/jsx-runtime"
import { ManageTagCard } from "./ManageTagCard"

interface ManageTagsDialogProps {
    open: boolean
    setIsManageTagsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    setActiveTag: React.Dispatch<React.SetStateAction<Tag>>
    setIsViewTaggedFilesDialogOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >
}

export function ManageTagsDialog({
    setIsManageTagsDialogOpen,
    setIsViewTaggedFilesDialogOpen,
    setActiveTag,
    open,
}: ManageTagsDialogProps) {
    const { data: tags } = useQuery({
        queryKey: [TAGS_QUERY_KEY],
        queryFn: getTags,
    })

    const { data: stats } = useQuery({
        queryKey: [TAGS_QUERY_KEY, GET_TOTAL_TAGGED_FILES_MAP_QUERY_KEY],
        queryFn: getTotalTaggedFilesMap,
    })

    return (
        <Dialog open={open} onOpenChange={setIsManageTagsDialogOpen}>
            <DialogContent aria-describedby="dialog-description">
                <DialogHeader>
                    <DialogTitle>Manage tags</DialogTitle>
                    <DialogDescription id="dialog-description">
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
                                        setActiveTag={setActiveTag}
                                        setIsManageTagsDialogOpen={
                                            setIsManageTagsDialogOpen
                                        }
                                        setIsViewTaggedFilesDialogOpen={
                                            setIsViewTaggedFilesDialogOpen
                                        }
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
            </DialogContent>
        </Dialog>
    )
}
