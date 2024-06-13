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
            console.log("setting url to " + href)
            history.pushState(null, "", href)

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
