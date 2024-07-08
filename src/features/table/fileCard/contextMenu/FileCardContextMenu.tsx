import {
    ContextMenuContent,
    ContextMenuSeparator,
} from "@src/components/ui/context-menu"
import { FullFileLink } from "@src/features/parser"
import CopyPathMenuItem from "@src/features/shared/commands/CopyPathMenuItem"
import { forwardRef } from "react"
import DownloadFileMenuItem from "./DownloadFileMenuItem"
import { MenuLabel } from "./MenuLabel"
import { TagsMenuSub } from "./TagsMenuSub"
import { UpdatesMenuItem } from "./UpdatesMenuItem"

interface FileCardContextMenuProps {
    fileLink: FullFileLink
}

const FileCardContextMenuContent = forwardRef<
    HTMLDivElement,
    FileCardContextMenuProps
>(({ fileLink }, ref) => {
    const isTagContextMenuShown = !(fileLink.fullName === "Parent Directory")

    return (
        <ContextMenuContent ref={ref}>
            <MenuLabel
                fileKey={fileLink.fileKey}
                fullName={fileLink.fullName}
                size={fileLink.size}
            />

            <ContextMenuSeparator />

            <UpdatesMenuItem fileLink={fileLink} />
            <CopyPathMenuItem href={fileLink.href} />
            <DownloadFileMenuItem
                href={fileLink.href}
                isFolder={fileLink.isFolder}
                fileName={fileLink.fullName}
            />

            {isTagContextMenuShown && <ContextMenuSeparator />}

            {isTagContextMenuShown && <TagsMenuSub fileLink={fileLink} />}
        </ContextMenuContent>
    )
})

FileCardContextMenuContent.displayName = "FileCardContextMenuContent"

export default FileCardContextMenuContent
