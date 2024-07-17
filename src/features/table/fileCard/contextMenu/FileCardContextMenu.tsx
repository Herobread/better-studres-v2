import {
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
} from "@src/components/ui/context-menu"
import {
    BASE_URL,
    convertUrlSegmentsToUrl,
    extractUrlSegments,
} from "@src/features/files"
import { FullFileLink } from "@src/features/parser"
import { redirect } from "@src/features/router"
import CopyPathMenuItem from "@src/features/shared/contextMenuItems/CopyPathMenuItem"
import { AddNoteContextMenuItem } from "@src/features/table/fileCard/contextMenu/AddNoteContextMenuItem"
import { FolderIcon, FolderRootIcon } from "lucide-react"
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
        const currentUrl = location.href
        const urlSegments = extractUrlSegments(currentUrl)
        const moduleRootUrl = convertUrlSegmentsToUrl([urlSegments[0]])

        return (
            <ContextMenuContent ref={ref}>
                <ContextMenuItem onClick={() => redirect(BASE_URL)}>
                    <FolderIcon className="h-4 w-4" /> Go to root
                </ContextMenuItem>
                <ContextMenuItem onClick={() => redirect(moduleRootUrl)}>
                    <FolderRootIcon className="h-4 w-4" />
                    Go to module root
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
            <AddNoteContextMenuItem fileKey={fileLink.fileKey} />

            <ContextMenuSeparator />

            <TagsMenuSub fileLink={fileLink} />
        </ContextMenuContent>
    )
})

FileCardContextMenuContent.displayName = "FileCardContextMenuContent"

export default FileCardContextMenuContent
