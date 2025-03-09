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
import { ChevronDown, SparklesIcon } from "lucide-react"
import { useEffect, useState } from "react"

export const HTML_ENHANCED_FILE_DATA_KEY = "is-html-enhanced"

export function ControlPanel() {
    const { navigateToPage } = useSmoothRouter()

    const currentUrl = window.location.toString()
    const currentUrlSegments = extractUrlSegments(currentUrl)

    const fileKey = generateFileKey(currentUrlSegments)

    const [isEnhanced, setIsEnhanced] = useState(false)
    const [selected, setSelected] = useState<"default" | "centered">("default")

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

    const handleGoToParent = () => {
        currentUrlSegments.pop()

        navigateToPage(convertUrlSegmentsToUrl(currentUrlSegments))
    }

    return (
        <>
            <Toolbar>
                <Button
                    size={"default"}
                    variant={"outline"}
                    onClick={handleGoToParent}
                >
                    🔙 Parent Directory
                </Button>
                <ToggleGroup
                    size={"sm"}
                    type="single"
                    className="grid grid-cols-2"
                    onValueChange={(value) => {
                        if (value) {
                            console.log(value)
                        }
                    }}
                >
                    <ToggleGroupItem
                        size={"sm"}
                        value="default"
                        onSelect={() => setSelected("default")}
                    >
                        📝 Default
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        size={"sm"}
                        value="centered"
                        onSelect={() => {
                            setSelected("centered")
                        }}
                    >
                        📐 Centered
                    </ToggleGroupItem>
                </ToggleGroup>
                <Separator orientation="vertical" />
                <Button size={"icon"} variant={"ghost"}>
                    <ChevronDown />
                </Button>
            </Toolbar>
        </>
    )

    // return (
    //     <Tooltip>
    //         <TooltipTrigger>
    //             <Toggle
    //                 className="bg-background-layer-1 opacity-25 transition-opacity hover:opacity-100"
    //                 onPressedChange={handleEnhance}
    //                 pressed={isEnhanced}
    //             >
    //                 <SparklesIcon />
    //             </Toggle>
    //         </TooltipTrigger>
    //         <TooltipContent>
    //             Applies basic css styles to potentially improve page appearance.
    //         </TooltipContent>
    //     </Tooltip>
    // )
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
