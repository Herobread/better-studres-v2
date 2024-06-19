import { useContext } from "react"
import { PageStateContext } from "@src/contexts/PageStateContext"
import { PageData } from "@src/content/parsers/parser"
import NotFound from "./pages/NotFound"
import Folder from "./pages/Folder"

interface RootProps {
    initialPageData: PageData
}

export default function Root({ initialPageData }: RootProps) {
    const { pageData: contextPageData } = useContext(PageStateContext)

    const pageData = contextPageData || initialPageData

    if (pageData.type === "not found") {
        return <NotFound />
    }

    if (pageData.type === "folder") {
        return <Folder content={pageData.content} />
    }

    throw new Error("unhandled page")
}
