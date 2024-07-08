import NiceModal, { useModal } from "@ebay/nice-modal-react"
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
import { useQuery } from "@tanstack/react-query"
import { Fragment } from "react/jsx-runtime"
import { convertFileKeysToMinimizedFileLinks } from "../files"
import {
    GET_FILES_TAGGED_QUERY_KEY,
    TAGS_QUERY_KEY,
    Tag,
    getFilesTagged,
} from "../files/tags/storage"
import { BaseFileLink } from "../parser"
import Link, { LinkProps } from "../router/Link"

interface ViewTaggedFilesDialogProps {
    tag: Tag
}

export default NiceModal.create(({ tag }: ViewTaggedFilesDialogProps) => {
    const modalHandler = useModal()

    const { id, name } = tag

    const { data: baseFileLinks } = useQuery({
        queryKey: [TAGS_QUERY_KEY, GET_FILES_TAGGED_QUERY_KEY + id],
        queryFn: async () => {
            const taggedFileKeys = await getFilesTagged(id)
            return await convertFileKeysToMinimizedFileLinks(taggedFileKeys)
        },
    })

    return (
        <Dialog handler={modalHandler}>
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
                            {baseFileLinks && baseFileLinks.length > 0 ? (
                                baseFileLinks.map((baseFileLink, i) => {
                                    return (
                                        <Fragment key={baseFileLink.rawHref}>
                                            <MinimizedTaggedLinkPreview
                                                baseFileLink={baseFileLink}
                                                onClick={() => {
                                                    modalHandler.hide()
                                                }}
                                            />
                                            {i < baseFileLinks.length - 1 && (
                                                <Separator />
                                            )}
                                        </Fragment>
                                    )
                                })
                            ) : (
                                <p>No tagged files or folders found.</p>
                            )}
                        </div>
                    </ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
})

interface MinimizedTaggedLinkPreviewProps extends LinkProps {
    baseFileLink: BaseFileLink
}

function MinimizedTaggedLinkPreview({
    baseFileLink,
    ...props
}: MinimizedTaggedLinkPreviewProps) {
    const { rawHref, rawName } = baseFileLink

    return (
        <Link
            href={rawHref}
            className="w-full rounded-lg p-2 hover:bg-background-layer-1"
            {...props}
        >
            <p className="font-bold">{rawName}</p>
            <p className="text-sm text-muted-foreground">{rawHref}</p>
        </Link>
    )
}