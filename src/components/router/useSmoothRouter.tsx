import { useContext, useCallback } from "react"
import { PageData, parsePageContent } from "@src/content/parsers/parser"
import redirect from "@src/lib/redirect"
import { PageStateContext } from "@src/contexts/PageStateContext"

const useSmoothRouter = () => {
    const { setIsLoading, setPageData } = useContext(PageStateContext)

    const navigateToPage = useCallback(
        async (href: string, state?: PageData) => {
            try {
                setIsLoading(true)

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

                    const now = new Date().getTime()
                    history.replaceState({ now }, "", href)
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
