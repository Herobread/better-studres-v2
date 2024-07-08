import {
    ContextMenu,
    ContextMenuTrigger,
} from "@src/components/ui/context-menu"
import { ConfigContext } from "@src/features/config"
import { FullFileLink } from "@src/features/parser"
import FileCardDetails, {
    FileCardDetailsProps,
} from "@src/features/table/fileCard/FileCardDetails"
import ImagePreviewWrapper from "@src/features/table/fileCard/ImagePreviewWrapper"
import { forwardRef, useContext } from "react"
import FileCardContextMenuContent from "./contextMenu/FileCardContextMenu"

interface FileCardProps extends FileCardDetailsProps {
    fileLink: FullFileLink
}
const FileCard = forwardRef<HTMLAnchorElement, FileCardProps>(
    ({ fileLink }, ref) => {
        const { imagePreviewOnHover } = useContext(ConfigContext)

        if (imagePreviewOnHover && fileLink.isImage) {
            return (
                <ImagePreviewWrapper
                    src={fileLink.href}
                    title={fileLink.fullName}
                    className="col-span-full grid grid-cols-subgrid"
                >
                    <FileCardDetails fileLink={fileLink} ref={ref} />
                </ImagePreviewWrapper>
            )
        }

        return <FileCardWithContextMenu fileLink={fileLink} ref={ref} />
    }
)

const FileCardWithContextMenu = forwardRef<HTMLAnchorElement, FileCardProps>(
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
