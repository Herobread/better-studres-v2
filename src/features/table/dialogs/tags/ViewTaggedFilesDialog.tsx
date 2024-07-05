import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@src/components/ui/dialog"
import { ScrollArea } from "@src/components/ui/scroll-area"
import { convertFileKeysToMinimizedFileLinks } from "@src/features/files"
import {
    GET_FILES_TAGGED_QUERY_KEY,
    TAGS_QUERY_KEY,
    Tag,
    getFilesTagged,
} from "@src/features/files/tags/storage"
import { useQuery } from "@tanstack/react-query"

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

    const { data: minimizedFileLinks } = useQuery({
        queryKey: [TAGS_QUERY_KEY, GET_FILES_TAGGED_QUERY_KEY + id],
        queryFn: async () => {
            const taggedFileKeys = await getFilesTagged(id)
            return await convertFileKeysToMinimizedFileLinks(taggedFileKeys)
        },
    })

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Files tagged {name}</DialogTitle>
                    <DialogDescription id="dialog-description">
                        Files tagged {name}
                    </DialogDescription>
                    <ScrollArea className="max-h-96">
                        {minimizedFileLinks?.map((minimizedFileLink) => {
                            return <p>{JSON.stringify(minimizedFileLink)}</p>
                        })}
                    </ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
