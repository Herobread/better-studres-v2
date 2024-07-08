import { FullFileLink } from "@src/features/parser"
import { PageStateContext } from "@src/features/router/PageStateContext"
import { SortLinks } from "@src/types/pageContentTypes"
import { useContext } from "react"
import FileCard from "../fileCard/FileCard"
import TableHeader from "./TableHeader"
import TableSkeleton from "./TableSkeleton"

interface TableProps {
    fileLinks: FullFileLink[]
    sortLinks: SortLinks
}

export function Table({ fileLinks, sortLinks }: TableProps) {
    const { isLoading } = useContext(PageStateContext)

    if (isLoading) {
        return <TableSkeleton />
    }

    let state = isLoading ? "closed" : "open"

    return (
        <div
            data-state={state}
            className="grid grid-cols-[50px_auto_4fr_max-content_max-content_3fr] gap-3 
          transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
          "
        >
            <TableHeader sortLinks={sortLinks} />
            {fileLinks.map((fileLink) => {
                return <FileCard fileLink={fileLink} key={fileLink.fileKey} />
            })}
        </div>
    )
}