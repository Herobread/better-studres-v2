import { useContext, useCallback } from "react"

import { redirect } from "@src/features/router/"
import { PageData, parsePageContent } from "@src/features/parser"
import { PageStateContext } from "./PageStateContext"
import { checkIsUrlBlackListed } from "../extensionToggle/blacklist"

const useSmoothRouter = () => {
    const { setIsLoading, setPageData } = useContext(PageStateContext)

    const navigateToPage = useCallback(
        async (href: string, state?: PageData) => {
            try {
                setIsLoading(true)

                const isBlackListed = await checkIsUrlBlackListed(href)

                if (isBlackListed) {
                    setIsLoading(false)
                    redirect(href)
                    return
                }

                let pageData
                let title = "Studres"

                if (state) {
                    pageData = state
                } else {
                    history.pushState(null, "", href)

                    const data = await fetch(href)
                    const htmlText = await data.text()
                    const parser = new DOMParser()
                    const document = parser.parseFromString(
                        htmlText,
                        "text/html"
                    )

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
