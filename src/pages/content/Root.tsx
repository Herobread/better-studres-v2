import { PageData } from "@src/features/parser"
import { PageStateContext } from "@src/features/router/PageStateContext"
import { FilePreview } from "@src/pages/content/pages/FilePreview"
import { useContext } from "react"
import Folder from "./pages/Folder"
import NotFound from "./pages/NotFound"

interface RootProps {
    initialPageData: PageData
}

export default function Root({ initialPageData }: RootProps) {
    const { pageData: contextPageData } = useContext(PageStateContext)

    const pageData = contextPageData || initialPageData

    if (pageData.type === "not found") {
        return <NotFound />
    }

    if (pageData.type === "file") {
        return <FilePreview content={pageData.content} />
    }

    if (pageData.type === "folder") {
        return <Folder content={pageData.content} />
    }

    location.reload()
}
