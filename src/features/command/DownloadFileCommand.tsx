import NiceModal from "@ebay/nice-modal-react"
import { CommandItem } from "@src/components/ui/command"
import { useToast } from "@src/components/ui/use-toast"
import { saveFolder } from "@src/features/fileDownload"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"

const COMMAND_KEYWORDS = ["download", "save", "install", "get"]

export function DownloadFileCommand({ url }: { url: string }) {
    const { toast } = useToast()

    const handleDownload = async () => {
        NiceModal.hide(CommandsDialog)
        toast({
            title: "📥 Downloading",
            description: "Fetching and archiving files.",
        })
        try {
            const name = await saveFolder(url)
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
    return (
        <CommandItem onSelect={handleDownload} keywords={COMMAND_KEYWORDS}>
            ⬇️ Download folder
        </CommandItem>
    )
}
