import ShadowWrapper from "@src/components/layouts/ShadowWrapper"
import { Button } from "@src/components/ui/button"
import {
    convertUrlSegmentsToUrl,
    extractUrlSegments,
} from "@src/features/files"
import useSmoothRouter from "@src/features/router/useSmoothRouter"

export function FileBackButton() {
    const { navigateToPage } = useSmoothRouter()

    const currentUrl = window.location.toString()
    const currentUrlSegments = extractUrlSegments(currentUrl)

    const handleGoToParent = () => {
        currentUrlSegments.pop()

        navigateToPage(convertUrlSegmentsToUrl(currentUrlSegments))
    }

    return (
        <ShadowWrapper classname="fixed bottom-4 left-4 p-1 bg-background text-foreground opacity-75 hover:opacity-100 rounded-md transition-all">
            <Button variant={"outline"} onClick={handleGoToParent}>
                🔙 Parent Directory
            </Button>
        </ShadowWrapper>
    )
}
