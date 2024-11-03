import NiceModal from "@ebay/nice-modal-react"
import { ContextMenuItem } from "@src/components/ui/context-menu"
import DownloadUsingScpDialog from "@src/features/shared/dialogs/DownloadUsingScpDialog"
import { CloudDownloadIcon } from "lucide-react"

interface DownloadUsingScpContextMenuItemProps {
    fileKey: string
}

export default function DownloadUsingScpContextMenuItem({
    fileKey,
}: DownloadUsingScpContextMenuItemProps) {
    const handleCopySshCommand = async () => {
        NiceModal.show(DownloadUsingScpDialog, { fileKey })
    }

    return (
        <ContextMenuItem onSelect={handleCopySshCommand}>
            <CloudDownloadIcon className="h-4 w-4" /> SSH download
        </ContextMenuItem>
    )
}
