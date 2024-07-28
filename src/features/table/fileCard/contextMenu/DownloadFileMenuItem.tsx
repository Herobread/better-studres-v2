import { ContextMenuItem } from "@src/components/ui/context-menu"
import { useToast } from "@src/components/ui/use-toast"
import { saveFolder } from "@src/features/fileDownload"
import { generateQuickLinkInfo } from "@src/features/quickLinks"
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            toast({
                title: "❌ Error",
                description: `Failed to download ${name}. ${error.message}`,
            })
        }
    }

    if (isFolder) {
        return (
            <ContextMenuItem onSelect={handleFolderDownload}>
                <DownloadIcon className="h-4 w-4" /> Download folder
            </ContextMenuItem>
        )
    }

    const handleSelect = () => {
        downloadFile(href, fileName)
    }

    return (
        <ContextMenuItem onSelect={handleSelect}>
            <DownloadIcon className="h-4 w-4" /> Download file
        </ContextMenuItem>
    )
}
