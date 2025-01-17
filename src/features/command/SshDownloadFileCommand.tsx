import NiceModal from "@ebay/nice-modal-react"
import { CommandItem } from "@src/components/ui/command"
import { extractUrlSegments, generateFileKey } from "@src/features/files"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import DownloadUsingScpDialog from "@src/features/shared/dialogs/DownloadUsingScpDialog"

const COMMAND_KEYWORDS = ["ssh", "download", "save", "install", "get"]

export function SshDownloadFileCommand({ url }: { url: string }) {
    const handleDownload = async () => {
        NiceModal.hide(CommandsDialog)
        const fileKey = generateFileKey(extractUrlSegments(url))
        NiceModal.show(DownloadUsingScpDialog, { fileKey })
    }

    return (
        <CommandItem onSelect={handleDownload} keywords={COMMAND_KEYWORDS}>
            ☁️ SSH Download folder
        </CommandItem>
    )
}
