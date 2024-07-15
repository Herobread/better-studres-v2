import { ContextMenuItem } from "@src/components/ui/context-menu"
import { useToast } from "@src/components/ui/use-toast"
import { saveFolder } from "@src/features/fileDownload"
import { generateQuickLinkInfo } from "@src/features/quickAccess"
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
    const { toast } = useToast()

    const handleFolderDownload = async () => {
        const { name } = generateQuickLinkInfo(href)
        toast({
            title: "📥 Downloading",
            description: "Fetching and archiving files.",
        })
        try {
            await saveFolder(href)
            toast({
                title: "✅ Success",
                description: `Downloaded ${name}.`,
            })
        } catch (error) {
            toast({
                title: "❌ Error",
                description: `Failed to download ${name}.`,
            })
        }
    }

    if (isFolder) {
        return (
            <ContextMenuItem onSelect={handleFolderDownload}>
                <DownloadIcon  className="w-4 h-4"/> Download folder
            </ContextMenuItem>
        )
    }

    const handleSelect = () => {
        downloadFile(href, fileName)
    }

    return (
        <ContextMenuItem onSelect={handleSelect}>
            <DownloadIcon  className="w-4 h-4"/> Download file
        </ContextMenuItem>
    )
}
