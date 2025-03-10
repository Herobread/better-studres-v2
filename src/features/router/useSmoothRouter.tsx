import { useCallback, useContext } from "react"

import { PageData, PageType, parsePageContent } from "@src/features/parser"
import { redirect } from "@src/features/router/"
import { checkIsUrlBlackListed } from "../extensionToggle/blacklist"
import { parseDocumentFromText } from "../fileDownload/parseDocumentFromText"
import { PageStateContext } from "./PageStateContext"

const useSmoothRouter = () => {
    const { setIsLoading, setPageData } = useContext(PageStateContext)

    const isSmoothNavigationSupported = (pageType: PageType) => {
        const supportedPageTypes: PageType[] = [
            "folder",
            "not found",
            "forbidden",
            "root",
            "file",
        ]
        return supportedPageTypes.includes(pageType)
    }

    const navigateToPage = useCallback(
        async (href: string, newState?: PageData, isFromRedirect?: boolean) => {
            try {
                const currentPageState =
                    (history.state as PageData) || undefined

                setIsLoading(true)

                const isBlackListed = await checkIsUrlBlackListed(href)
                const isSupported = isSmoothNavigationSupported(
                    currentPageState.type
                )

                if (isBlackListed || !isSupported) {
                    setIsLoading(false)
                    redirect(href)
                    return
                }

                let pageData
                let title = "Studres"

                if (newState) {
                    pageData = newState
                } else {
                    if (isFromRedirect) {
                        history.replaceState(null, "", href)
                    } else {
                        history.pushState(null, "", href)
                    }

                    const response = await fetch(href)
                    if (response.redirected) {
                        history.replaceState(
                            { ...currentPageState },
                            "",
                            response.url
                        )
                        navigateToPage(response.url, undefined, true)
                        return
                    }
                    const htmlText = await response.text()
                    const document = await parseDocumentFromText(htmlText)

                    pageData = parsePageContent(document.body)

                    title = document.title

                    history.replaceState({ ...pageData }, "", href)
                }

                document.title = title

                setPageData(pageData)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                redirect(href)
            }
        },
        [setIsLoading, setPageData]
    )

    return { navigateToPage }
}

export default useSmoothRouter
