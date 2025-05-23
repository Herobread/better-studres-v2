import {
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import { FullFileLink } from "@src/features/parser"
import DownloadFileMenuItem from "@src/features/table/fileCard/contextMenu/DownloadFileMenuItem"
import DownloadUsingScpContextMenuItem from "@src/features/table/fileCard/contextMenu/DownloadUsingScpContextMenuItem"
import { DownloadIcon } from "lucide-react"

export function DownloadMenuSub({ fileLink }: { fileLink: FullFileLink }) {
    return (
        <ContextMenuSub>
            <ContextMenuSubTrigger>
                <DownloadIcon className="h-4 w-4" /> Download
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="max-h-[300px] w-48 overflow-auto">
                <DownloadFileMenuItem
                    fileKey={fileLink.fileKey}
                    href={fileLink.href}
                    isFolder={fileLink.isFolder}
                    fileName={fileLink.fullName}
                />
                <DownloadUsingScpContextMenuItem fileKey={fileLink.fileKey} />
            </ContextMenuSubContent>
        </ContextMenuSub>
    )
}
