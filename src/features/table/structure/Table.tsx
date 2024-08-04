import { FullFileLink } from "@src/features/parser"
import { PageStateContext } from "@src/features/router/PageStateContext"
import FileCard from "@src/features/table/fileCard/FileCard"
import { EmptyFolderMessage } from "@src/features/table/structure/EmptyFolderMessage"
import { SortLinks } from "@src/types/pageContentTypes"
import { useContext } from "react"
import TableHeader from "./TableHeader"
import TableSkeleton from "./TableSkeleton"

interface TableProps {
    fileLinks: FullFileLink[]
    sortLinks: SortLinks
}

export function Table({ fileLinks, sortLinks }: TableProps) {
    const { isLoading, transitionData } = useContext(PageStateContext)

    if (isLoading) {
        return <TableSkeleton />
    }

    const state = isLoading ? "closed" : "open"

    return (
        <>
            <div
                data-state={state}
                data-direction={transitionData?.direction}
                className="grid grid-cols-[50px_auto_4fr_max-content_max-content_3fr] gap-3 
                transition-opacity
                data-[state=open]:animate-in data-[state=closed]:animate-out 
                data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
                data-[direction=bottom][data-state=open]:slide-in-from-bottom-10 
                data-[direction=left][data-state=open]:slide-in-from-left-10
                data-[direction=right][data-state=open]:slide-in-from-right-10
                data-[direction=top][data-state=open]:slide-in-from-top-10
                "
            >
                <TableHeader sortLinks={sortLinks} />
                {fileLinks.map((fileLink, i) => {
                    const id = i === 0 ? "main-content" : ""

                    return (
                        <FileCard
                            fileLink={fileLink}
                            key={fileLink.fileKey}
                            id={id}
                        />
                    )
                })}
                {fileLinks.length === 1 && <EmptyFolderMessage />}
            </div>
        </>
    )
}
