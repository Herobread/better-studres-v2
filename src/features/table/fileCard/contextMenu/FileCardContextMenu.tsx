import {
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
} from "@src/components/ui/context-menu"
import { BASE_URL } from "@src/features/files"
import { FullFileLink } from "@src/features/parser"
import { redirect } from "@src/features/router"
import CopyPathMenuItem from "@src/features/shared/contextMenuItems/CopyPathMenuItem"
import { FolderIcon } from "lucide-react"
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
    const isParentDirectory = fileLink.fullName === "Parent Directory"

    if (isParentDirectory) {
        return (
            <ContextMenuContent ref={ref}>
                <ContextMenuItem onClick={() => redirect(BASE_URL)}>
                    <FolderIcon  className="w-4 h-4"/> Go to Root
                </ContextMenuItem>
            </ContextMenuContent>
        )
    }

    return (
        <ContextMenuContent ref={ref}>
            <MenuLabel
                fullName={fileLink.fullName}
                size={fileLink.size}
                description={fileLink.lastModified.raw}
            />

            <ContextMenuSeparator />

            <UpdatesMenuItem fileLink={fileLink} />
            <CopyPathMenuItem href={fileLink.href} />
            <DownloadFileMenuItem
                href={fileLink.href}
                isFolder={fileLink.isFolder}
                fileName={fileLink.fullName}
            />

            <ContextMenuSeparator />

            <TagsMenuSub fileLink={fileLink} />
        </ContextMenuContent>
    )
})

FileCardContextMenuContent.displayName = "FileCardContextMenuContent"

export default FileCardContextMenuContent
