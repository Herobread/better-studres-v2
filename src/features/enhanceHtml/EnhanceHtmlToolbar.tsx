import { Button } from "@src/components/ui/button"
import { Separator } from "@src/components/ui/separator"
import { Toggle } from "@src/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@src/components/ui/toggle-group"
import { Toolbar } from "@src/components/ui/toolbar"
import {
    GET_FILE_DATA_QUERY_KEY,
    convertUrlSegmentsToUrl,
    extractUrlSegments,
    generateFileKey,
    getFileData,
    saveFileData,
} from "@src/features/files"
import useSmoothRouter from "@src/features/router/useSmoothRouter"
import { useQuery } from "@tanstack/react-query"
import { SparklesIcon } from "lucide-react"
import { useEffect, useState } from "react"

export const HTML_ENHANCED_FILE_DATA_KEY = "is-html-enhanced"

export function EnhanceHtmlToolbar() {
    const { navigateToPage } = useSmoothRouter()

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

    const handleGoToParent = () => {
        currentUrlSegments.pop()

        navigateToPage(convertUrlSegmentsToUrl(currentUrlSegments))
    }

    return (
        <>
            <Toolbar
                isMinimized={isMinimized}
                onToggleMinimized={() => {
                    setIsMinimized(!isMinimized)
                }}
            >
                <Button
                    size={"default"}
                    variant={"outline"}
                    onClick={handleGoToParent}
                >
                    🔙 ../
                    <span className="sr-only">Parent directory</span>
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
        </>
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
