import {
    ContextMenuContent,
    ContextMenuSeparator,
} from "@src/components/ui/context-menu"
import { AddQuickLinkMenuItem } from "@src/features/table/fileCard/contextMenu/AddQuickLinkMenuItem"
import { OpenInNewTabMenuItem } from "@src/features/table/fileCard/contextMenu/OpenInNewTabMenuItem"
import { FileTextIcon, LinkIcon, TerminalIcon } from "lucide-react"
import { extractUrlSegments, generateFileKey } from "../files"
import CopyTextMenuItem from "../shared/contextMenuItems/CopyTextMenuItem"
import { generateLabPcPath } from "../table/fileCard/contextMenu/CopyMenuSub"
import DownloadUsingScpContextMenuItem from "../table/fileCard/contextMenu/DownloadUsingScpContextMenuItem"
import { MenuLabel } from "../table/fileCard/contextMenu/MenuLabel"

export function BasicContextMenu({
    href,
    name,
}: {
    href: string
    name: string
}) {
    return (
        <ContextMenuContent>
            <MenuLabel description="" fullName={name} />

            <ContextMenuSeparator />

            <AddQuickLinkMenuItem href={href} />

            <OpenInNewTabMenuItem href={href} />

            <ContextMenuSeparator />

            <CopyTextMenuItem
                messageItemName="URL"
                icon={<LinkIcon className="h-4 w-4" />}
                name="Copy URL"
                textToCopy={href}
            />

            <CopyTextMenuItem
                messageItemName="name"
                icon={<FileTextIcon className="h-4 w-4" />}
                name={`Copy "${name}"`}
                textToCopy={name}
            />

            <CopyTextMenuItem
                messageItemName="path"
                icon={<TerminalIcon className="h-4 w-4" />}
                name="Copy Lab PC Path"
                textToCopy={generateLabPcPath(extractUrlSegments(href))}
            />

            <ContextMenuSeparator />

            <DownloadUsingScpContextMenuItem
                fileKey={generateFileKey(extractUrlSegments(href))}
            />
        </ContextMenuContent>
    )
}
