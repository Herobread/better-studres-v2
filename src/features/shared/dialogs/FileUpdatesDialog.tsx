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
import { useToast } from "@src/components/ui/use-toast"
import { saveFolder } from "@src/features/fileDownload"
import { useQuery } from "@tanstack/react-query"
import { ArrowRightIcon } from "lucide-react"
import { Fragment } from "react/jsx-runtime"
import {
    ChangesRecord,
    GET_TRACKED_FILE_LINK_QUERY_KEY_BASE,
    generateChangeRecords,
    getTrackedFileLink,
} from "../../files"
import { FullFileLink } from "../../parser"

export default NiceModal.create(({ fileLink }: { fileLink: FullFileLink }) => {
    const modalHandler = useModal()

    const {toast} = useToast()

    const { fileKey, fullName, emoji, href, lastModified } = fileLink

    const { data: fileUpdates } = useQuery({
        queryKey: [GET_TRACKED_FILE_LINK_QUERY_KEY_BASE, fileKey],
        queryFn: async () => {
            return await getTrackedFileLink(fileKey)
        },
    })

    const handleClose = () => {
        modalHandler.hide()
    }

    const handleDownload = async () => {
        toast({
            title: "📥 Downloading",
            description: "Fetching and archiving files.",
        })
        try {
            await saveFolder(href)
            toast({
                title: "✅ Success",
                description: `Downloaded ${fullName}.`,
            })
        } catch (error) {
            toast({
                title: "❌ Error",
                description: `Failed to download ${fullName}.`,
            })
        }
    }

    return (
        <Dialog handler={modalHandler}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Version history of {emoji}
                        {fullName}
                    </DialogTitle>
                    <DialogDescription>
                        Locally observed changes in file size or modification
                        date.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-96">
                    <div className="grid grid-cols-[max-content_1fr] gap-2">
                        {fileUpdates && (
                            <ChangesRecordCard
                                changeRecords={generateChangeRecords(
                                    fileUpdates
                                )}
                            />
                        )}
                    </div>
                </ScrollArea>
                <DialogFooter className="flex gap-1">
                    <Button variant={'outline'} onClick={handleClose}>Close</Button>
                    <Button onClick={handleDownload}>Download current version</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})

type ChangesRecordCardProps = {
    changeRecords: ChangesRecord[]
}

function ChangesRecordCard({ changeRecords }: ChangesRecordCardProps) {
    return (
        <div className="col-span-full grid grid-cols-subgrid gap-2">
            {changeRecords.map((changeRecord) => {
                const { header, changes, timestamp, version } = changeRecord

                return (
                    <Fragment key={timestamp.getTime()}>
                        <span className="h-min rounded-lg bg-muted px-2 font-bold">
                            {version}
                        </span>
                        <div className="gap-1">
                            <p className="font-bold">{header}</p>
                            {changes && (
                                <div className="flex items-center gap-1">
                                    <ChangesList changes={changes.before} />
                                    {changes.after && (
                                        <>
                                            <ArrowRightIcon
                                                size={18}
                                                strokeWidth={1}
                                            />
                                            <ChangesList
                                                changes={changes.after}
                                            />
                                        </>
                                    )}
                                </div>
                            )}
                            <p className="text-muted-foreground">
                                Observed{" "}
                                {timestamp.toLocaleString("en-UK", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: false,
                                })}
                            </p>
                        </div>
                    </Fragment>
                )
            })}
        </div>
    )
}

type ChangesListProps = {
    changes: string[]
}

function ChangesList({ changes }: ChangesListProps) {
    return (
        <ul>
            {changes.map((change) => {
                if (change === "0B") {
                    change = "Unknown size"
                }

                return <li key={change}>{change}</li>
            })}
        </ul>
    )
}
