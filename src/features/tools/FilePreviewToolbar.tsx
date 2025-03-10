import NiceModal from "@ebay/nice-modal-react"
import { Button } from "@src/components/ui/button"
import { Separator } from "@src/components/ui/separator"
import { Toolbar } from "@src/components/ui/toolbar"
import { useToast } from "@src/components/ui/use-toast"
import { extractUrlSegments, generateFileKey } from "@src/features/files"
import DownloadUsingScpDialog from "@src/features/shared/dialogs/DownloadUsingScpDialog"
import { downloadFile } from "@src/lib/utils"
import { useState } from "react"

export function FilePreviewToolbar() {
    const { toast } = useToast()

    const currentUrl = window.location.toString()
    const currentUrlSegments = extractUrlSegments(currentUrl)

    const [isMinimized, setIsMinimized] = useState(true)

    const handleWebDownload = async () => {
        toast({
            title: "📥 Downloading",
            description: "Fetching and archiving files.",
        })
        const name = currentUrlSegments[currentUrlSegments.length - 1]
        try {
            downloadFile(
                currentUrl,
                currentUrlSegments[currentUrlSegments.length - 1]
            )
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

    const handleSshDownload = () => {
        const fileKey = generateFileKey(extractUrlSegments(currentUrl))
        NiceModal.show(DownloadUsingScpDialog, { fileKey })
    }

    return (
        <>
            <Toolbar
                isMinimized={isMinimized}
                onToggleMinimized={() => {
                    setIsMinimized(!isMinimized)
                }}
            >
                <Button variant={"outline"} onClick={handleWebDownload}>
                    ⬇️ Web Download
                </Button>
                <Button variant={"outline"} onClick={handleSshDownload}>
                    ☁️ SSH Download
                </Button>
                <Separator orientation="vertical" />
            </Toolbar>
        </>
    )
}
