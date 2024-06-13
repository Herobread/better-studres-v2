import { useContext } from "react"
import { parsePageContent } from "@src/content/parsers/parser"
import redirect from "@src/lib/redirect"
import { PageStateContext } from "@src/contexts/PageStateContext"

const useSmoothRouter = () => {
    const { setIsLoading, setPageData } = useContext(PageStateContext)

    const navigateToPage = async (href: string) => {
        console.log("handling navigation to " + href)

        setIsLoading(true)
        try {
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

            const now = new Date()
            document.title = now.getTime() + ""

            // window.history.pushState({ title: now.getTime() + "" }, "", href)
            window.history.replaceState(null, "", href)
        } catch (error) {
            setIsLoading(false)
            redirect(href)
        }
    }

    return { navigateToPage }
}

export default useSmoothRouter
