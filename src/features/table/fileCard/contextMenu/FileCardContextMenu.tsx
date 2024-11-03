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
import useSmoothRouter from "@src/features/router/useSmoothRouter"
import CopyTextMenuItem from "@src/features/shared/contextMenuItems/CopyTextMenuItem"
import { AddNoteContextMenuItem } from "@src/features/table/fileCard/contextMenu/AddNoteContextMenuItem"
import { AddQuickLinkMenuItem } from "@src/features/table/fileCard/contextMenu/AddQuickLinkMenuItem"
import DownloadUsingScpContextMenuItem from "@src/features/table/fileCard/contextMenu/DownloadUsingScpContextMenuItem"
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
    const { navigateToPage } = useSmoothRouter()
    const isParentDirectory = fileLink.fullName === "Parent Directory"

    if (isParentDirectory) {
        const currentUrl = location.href
        const urlSegments = extractUrlSegments(currentUrl)
        const moduleRootUrl = convertUrlSegmentsToUrl([urlSegments[0]])

        return (
            <ContextMenuContent ref={ref}>
                <ContextMenuItem onClick={() => navigateToPage(BASE_URL)}>
                    <FolderIcon className="h-4 w-4" /> Go to root
                </ContextMenuItem>
                <ContextMenuItem onClick={() => navigateToPage(moduleRootUrl)}>
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

            <AddQuickLinkMenuItem href={fileLink.href} />
            <UpdatesMenuItem fileLink={fileLink} />
            <CopyTextMenuItem name="URL" textToCopy={fileLink.href} />
            <CopyTextMenuItem name="file name" textToCopy={fileLink.fullName} />
            <DownloadFileMenuItem
                fileKey={fileLink.fileKey}
                href={fileLink.href}
                isFolder={fileLink.isFolder}
                fileName={fileLink.fullName}
            />
            <DownloadUsingScpContextMenuItem fileKey={fileLink.fileKey} />

            <AddNoteContextMenuItem fileKey={fileLink.fileKey} />

            <ContextMenuSeparator />

            <TagsMenuSub fileLink={fileLink} />
        </ContextMenuContent>
    )
})

FileCardContextMenuContent.displayName = "FileCardContextMenuContent"

export default FileCardContextMenuContent
