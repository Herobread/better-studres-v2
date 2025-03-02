import { PageData } from "@src/features/parser"
import { PageStateContext } from "@src/features/router/PageStateContext"
import { FilePreview } from "@src/pages/content/pages/FilePreview"
import { useContext } from "react"
import Folder from "./pages/Folder"
import Forbidden from "./pages/Forbidden"
import NotFound from "./pages/NotFound"
import RootPage from "./pages/RootPage"

interface RootProps {
    initialPageData: PageData
}

export default function Root({ initialPageData }: RootProps) {
    const { pageData: contextPageData } = useContext(PageStateContext)
    const pageData = contextPageData || initialPageData

    if (pageData.type === "not found") {
        return <NotFound />
    }

    if (pageData.type === "forbidden") {
        return <Forbidden />
    }

    if (pageData.type === "file") {
        return <FilePreview content={pageData.content} />
    }

    if (pageData.type === "folder") {
        return <Folder content={pageData.content} />
    }

    if (pageData.type === "root") {
        return <RootPage content={pageData.content} />
    }

    location.reload()
}
