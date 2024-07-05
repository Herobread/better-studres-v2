import { Badge } from "@src/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@src/components/ui/dialog"
import { ScrollArea } from "@src/components/ui/scroll-area"
import { Separator } from "@src/components/ui/separator"
import { convertFileKeysToMinimizedFileLinks } from "@src/features/files"
import {
    GET_FILES_TAGGED_QUERY_KEY,
    TAGS_QUERY_KEY,
    Tag,
    getFilesTagged,
} from "@src/features/files/tags/storage"
import { useQuery } from "@tanstack/react-query"
import { Fragment } from "react/jsx-runtime"
import { MinimizedTaggedLinkPreview } from "./MinimizedTaggedLinkPreview"

interface ViewTaggedFilesDialogProps {
    open: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    tag: Tag
}

export function ViewTaggedFilesDialog({
    setIsOpen,
    open,
    tag,
}: ViewTaggedFilesDialogProps) {
    const { id, name } = tag

    const { data: minimizedFileLinks } = useQuery({
        queryKey: [TAGS_QUERY_KEY, GET_FILES_TAGGED_QUERY_KEY + id],
        queryFn: async () => {
            const taggedFileKeys = await getFilesTagged(id)
            return await convertFileKeysToMinimizedFileLinks(taggedFileKeys)
        },
    })

    return (
        <Dialog onOpenChange={setIsOpen} open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Files tagged <Badge variant={"secondary"}>{name}</Badge>
                    </DialogTitle>
                    <DialogDescription id="dialog-description">
                        Files tagged {name}
                    </DialogDescription>
                    <ScrollArea className="max-h-96">
                        <div className="grid gap-2">
                            {minimizedFileLinks?.map((minimizedFileLink, i) => {
                                return (
                                    <Fragment key={minimizedFileLink.href}>
                                        <MinimizedTaggedLinkPreview
                                            onClick={() => {
                                                setIsOpen(false)
                                            }}
                                            minimizedFileLink={
                                                minimizedFileLink
                                            }
                                        />
                                        {i < minimizedFileLinks.length - 1 && (
                                            <Separator />
                                        )}
                                    </Fragment>
                                )
                            })}
                        </div>
                    </ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
