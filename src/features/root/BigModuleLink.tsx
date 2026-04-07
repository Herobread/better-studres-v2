import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@src/components/ui/context-menu"
import { AddQuickLinkMenuItem } from "@src/features/table/fileCard/contextMenu/AddQuickLinkMenuItem"
import { OpenInNewTabMenuItem } from "@src/features/table/fileCard/contextMenu/OpenInNewTabMenuItem"
import { FileTextIcon } from "lucide-react"
import { getModuleEmoji } from "../contentEnhancers/emoji/modules"
import { extractUrlSegments, generateFileKey } from "../files"
import Link from "../router/Link"
import CopyTextMenuItem from "../shared/contextMenuItems/CopyTextMenuItem"
import DownloadFileMenuItem from "../table/fileCard/contextMenu/DownloadFileMenuItem"
import DownloadUsingScpContextMenuItem from "../table/fileCard/contextMenu/DownloadUsingScpContextMenuItem"
import { MenuLabel } from "../table/fileCard/contextMenu/MenuLabel"

export function BigModuleLink({ href, name }: { href: string; name: string }) {
    const icon = getModuleEmoji(name)

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Link
                    href={href}
                    className="group flex cursor-pointer items-center justify-center gap-2 rounded-md bg-background-layer-1 px-3 py-2 text-center outline-none ring-offset-background transition-all hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <div>{icon}</div>
                    <div className="font-mono">{name}</div>
                </Link>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <MenuLabel description="" fullName={name} />

                <ContextMenuSeparator />

                <AddQuickLinkMenuItem href={href} />

                <OpenInNewTabMenuItem href={href} />

                <CopyTextMenuItem
                    icon={<FileTextIcon className="h-4 w-4" />}
                    name={`Copy "${name}"`}
                    textToCopy={name}
                />

                <DownloadFileMenuItem
                    disabled
                    fileKey={""}
                    href={href}
                    isFolder={true}
                    fileName={""}
                />

                <DownloadUsingScpContextMenuItem
                    fileKey={generateFileKey(extractUrlSegments(href))}
                />
            </ContextMenuContent>
        </ContextMenu>
    )
}
