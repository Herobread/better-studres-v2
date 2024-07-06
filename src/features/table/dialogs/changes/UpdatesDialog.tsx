import { Dialog, DialogContent } from "@src/components/ui/dialog"
import {
    GET_TRACKED_FILE_LINK_QUERY_KEY_BASE,
    generateChangeRecords,
    generateFileLinkKeyDeprecated,
    getTrackedFileLink,
} from "@src/features/files"
import { FileLink } from "@src/types/pageContentTypes"
import { useQuery } from "@tanstack/react-query"
import ChangesRecordCard from "./ChangesRecordCard"

interface UpdatesDialogProps {
    fileLink: FileLink
    open: boolean
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UpdatesDialog({
    fileLink,
    onOpenChange,
    open,
}: UpdatesDialogProps) {
    const fileKey = generateFileLinkKeyDeprecated(fileLink)

    const { data } = useQuery({
        queryKey: [GET_TRACKED_FILE_LINK_QUERY_KEY_BASE, fileKey],
        queryFn: async () => {
            return await getTrackedFileLink(fileKey)
        },
    })

    const filename =
        fileLink.name + (fileLink.extension ? "." + fileLink.extension : "")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <div className="space-y-5">
                    <div>
                        <h2 className="text-xl font-bold">
                            Version history of {fileLink.emoji}
                            {filename}
                        </h2>
                        <p className="text-muted-foreground">
                            Note: updates are only tracked locally.
                        </p>
                    </div>
                    <div className="grid grid-cols-[max-content_1fr] gap-2">
                        {data && (
                            <ChangesRecordCard
                                changeRecords={generateChangeRecords(data)}
                            />
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
