import { Toggle } from "@src/components/ui/toggle"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@src/components/ui/tooltip"
import {
    GET_FILE_DATA_QUERY_KEY,
    extractUrlSegments,
    generateFileKey,
    getFileData,
    saveFileData,
} from "@src/features/files"
import { useQuery } from "@tanstack/react-query"
import { SparklesIcon } from "lucide-react"
import { useEffect, useState } from "react"

export const HTML_ENHANCED_FILE_DATA_KEY = "is-html-enhanced"

export function ControlPanel() {
    const fileKey = generateFileKey(extractUrlSegments(location.href))

    const [isEnhanced, setIsEnhanced] = useState(false)

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
            setIsEnhanced(isEnhancedRemote)
            applyEnhancements(isEnhancedRemote)
        }
    }, [isEnhancedRemote])

    const handleEnhance = async (pressed: boolean) => {
        setIsEnhanced(pressed)
        await saveFileData(fileKey, HTML_ENHANCED_FILE_DATA_KEY, pressed)
        applyEnhancements(pressed)
    }

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

    return (
        <Tooltip>
            <TooltipTrigger>
                <Toggle
                    className="bg-background-layer-1 opacity-25 transition-opacity hover:opacity-100"
                    onPressedChange={handleEnhance}
                    pressed={isEnhanced}
                >
                    <SparklesIcon />
                </Toggle>
            </TooltipTrigger>
            <TooltipContent>
                Applies basic css styles to potentially improve page appearance.
            </TooltipContent>
        </Tooltip>
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
