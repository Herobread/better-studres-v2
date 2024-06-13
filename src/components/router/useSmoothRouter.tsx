import { useContext } from "react"
import { parsePageContent } from "@src/content/parsers/parser"
import redirect from "@src/lib/redirect"
import { PageStateContext } from "@src/contexts/PageStateContext"

const useSmoothRouter = () => {
    const { setIsLoading, setPageData } = useContext(PageStateContext)

    const navigateToPage = async (href: string) => {
        setIsLoading(true)
        try {
            const now = new Date()
            history.pushState({ a: now.getTime() }, "", href)

            const data = await fetch(href)

            const htmlText = await data.text()
            const parser = new DOMParser()
            const { body, title } = parser.parseFromString(
                htmlText,
                "text/html"
            )

            const pageData = parsePageContent(body)

            setPageData(pageData)
            setIsLoading(false)

            document.title = title
        } catch (error) {
            setIsLoading(false)
            redirect(href)
        }
    }

    return { navigateToPage }
}

export default useSmoothRouter
