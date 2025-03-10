import NiceModal from "@ebay/nice-modal-react"
import ShadowWrapper from "@src/components/layouts/ShadowWrapper"
import { Button } from "@src/components/ui/button"
import { Separator } from "@src/components/ui/separator"
import { Toggle } from "@src/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@src/components/ui/toggle-group"
import { Toolbar } from "@src/components/ui/toolbar"
import { useToast } from "@src/components/ui/use-toast"
import {
    GET_FILE_DATA_QUERY_KEY,
    extractUrlSegments,
    generateFileKey,
    getFileData,
    saveFileData,
} from "@src/features/files"
import DownloadUsingScpDialog from "@src/features/shared/dialogs/DownloadUsingScpDialog"
import { downloadFile } from "@src/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { SparklesIcon } from "lucide-react"
import { useEffect, useState } from "react"

export const HTML_ENHANCED_FILE_DATA_KEY = "is-html-enhanced"

export function EnhanceHtmlToolbar() {
    const { toast } = useToast()

    const currentUrl = window.location.toString()
    const currentUrlSegments = extractUrlSegments(currentUrl)

    const fileKey = generateFileKey(currentUrlSegments)
    const [isMinimized, setIsMinimized] = useState(true)

    const [textStyle, setTextStyle] = useState<"default" | "centered">(
        "default"
    )

    const { isLoading, data: isEnhancedRemote } = useQuery({
        queryKey: [
            GET_FILE_DATA_QUERY_KEY,
            fileKey,
            HTML_ENHANCED_FILE_DATA_KEY,
        ],
        queryFn: () =>
            getFileData(
                fileKey,
                HTML_ENHANCED_FILE_DATA_KEY
            ) as Promise<boolean>,
    })

    useEffect(() => {
        if (isEnhancedRemote !== undefined) {
            setTextStyle(isEnhancedRemote ? "centered" : "default")
            applyEnhancements(isEnhancedRemote)
        }
    }, [isEnhancedRemote])

    const applyEnhancements = (enhanced: boolean) => {
        const body = document.body
        if (enhanced) {
            body.classList.add("enhanced-html")
        } else {
            body.classList.remove("enhanced-html")
        }
    }

    if (isLoading) {
        return (
            <Toggle disabled>
                <SparklesIcon />
            </Toggle>
        )
    }

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
        <ShadowWrapper>
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
                <ToggleGroup
                    size="sm"
                    type="single"
                    className="grid grid-cols-2"
                    value={textStyle}
                    onValueChange={async (value) => {
                        if (value) {
                            setTextStyle(value as "default" | "centered")

                            const isEnhanced = value === "centered"

                            await saveFileData(
                                fileKey,
                                HTML_ENHANCED_FILE_DATA_KEY,
                                isEnhanced
                            )
                            applyEnhancements(isEnhanced)
                        }
                    }}
                >
                    <ToggleGroupItem
                        size="sm"
                        value="default"
                        className="text-nowrap"
                    >
                        📝 Default
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        size="sm"
                        value="centered"
                        className="text-nowrap"
                    >
                        📐 Centered
                    </ToggleGroupItem>
                </ToggleGroup>
                <Separator orientation="vertical" />
            </Toolbar>
        </ShadowWrapper>
    )
}

const styles = `
.enhanced-html {
    max-width: 80ch !important;
    margin: auto !important;
    margin-top: 50px !important;
    font-family: math, serif !important;
}
`

const styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
