import { useContext } from "react"
import { PageData } from "@src/features/parser"
import NotFound from "./pages/NotFound"
import Folder from "./pages/Folder"
import { PageStateContext } from "@src/features/router/PageStateContext"

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
