import {
    ContextMenu,
    ContextMenuTrigger,
} from "@src/components/ui/context-menu"
import { FullFileLink } from "@src/features/parser"
import { forwardRef } from "react"
import FileCardDetails, { FileCardDetailsProps } from "./FileCardDetails"
import FileCardContextMenuContent from "./contextMenu/FileCardContextMenu"

interface FileCardProps extends FileCardDetailsProps {
    fileLink: FullFileLink
}

const FileCard = forwardRef<HTMLAnchorElement, FileCardProps>(
    ({ fileLink }, ref) => {
        return (
            <ContextMenu>
                <ContextMenuTrigger className="col-span-full grid grid-cols-subgrid">
                    <FileCardDetails fileLink={fileLink} ref={ref} />
                </ContextMenuTrigger>
                <FileCardContextMenuContent fileLink={fileLink} />
            </ContextMenu>
        )
    }
)

FileCard.displayName = "FileCard"

export default FileCard
