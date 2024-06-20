import { Tooltip } from "@radix-ui/react-tooltip"
import { ContextMenuItem } from "@src/components/ui/context-menu"
import { TooltipContent, TooltipTrigger } from "@src/components/ui/tooltip"
import { downloadFile } from "@src/lib/utils"
import { DownloadIcon } from "lucide-react"

interface DownloadFileMenuItemProps {
    href: string
    isFolder: boolean
    fileName: string
}

export default function DownloadFileMenuItem({
    href,
    isFolder,
    fileName,
}: DownloadFileMenuItemProps) {
    if (isFolder) {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <ContextMenuItem disabled>
                        <DownloadIcon /> Download file
                    </ContextMenuItem>
                </TooltipTrigger>
                <TooltipContent>
                    Folder download is not supported
                </TooltipContent>
            </Tooltip>
        )
    }

    const handleSelect = () => {
        downloadFile(href, fileName)
    }

    return (
        <ContextMenuItem onSelect={handleSelect}>
            <DownloadIcon /> Download file
        </ContextMenuItem>
    )
}
