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

    // scp -r on6@on6.teaching.cs.st-andrews.ac.uk:/cs/studres/CS2003/Coursework/CS2003-C3-microblog/ Documents

    return (
        <ContextMenuItem onSelect={handleCopySshCommand}>
            <CloudDownloadIcon className="h-4 w-4" /> SSH download
        </ContextMenuItem>
    )
}
