import { ContextMenuItem } from "@src/components/ui/context-menu"
import { useToast } from "@src/components/ui/use-toast"
import { saveFolder } from "@src/features/fileDownload"
import { useDownloadInfo } from "@src/features/fileDownload/DownloadInfoContext"
import { generateQuickLinkInfo } from "@src/features/quickLinks"
import { downloadFile } from "@src/lib/utils"
import { DownloadIcon } from "lucide-react"

interface DownloadFileMenuItemProps {
    href: string
    isFolder: boolean
    fileName: string
    fileKey: string
    disabled?: boolean
}

export default function DownloadFileMenuItem({
    href,
    disabled,
    isFolder,
    fileName,
    fileKey,
}: DownloadFileMenuItemProps) {
    const { toast } = useToast()
    const { addFileKeyToDownloadingList, removeFileKeyFromDownloadingList } =
        useDownloadInfo()

    const handleFolderDownload = async () => {
        addFileKeyToDownloadingList(fileKey)

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
        } finally {
            removeFileKeyFromDownloadingList(fileKey)
        }
    }

    if (isFolder) {
        return (
            <ContextMenuItem
                disabled={disabled}
                onSelect={handleFolderDownload}
            >
                <DownloadIcon className="h-4 w-4" /> Web download
            </ContextMenuItem>
        )
    }

    const handleSelect = () => {
        downloadFile(href, fileName)
    }

    return (
        <ContextMenuItem disabled={disabled} onSelect={handleSelect}>
            <DownloadIcon className="h-4 w-4" /> Web download
        </ContextMenuItem>
    )
}
