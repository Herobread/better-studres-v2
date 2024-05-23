import { FileLink, SortLinks } from "@src/types/pageContentTypes"
import FileCard from "./FileCard"
import TableHeader from "./TableHeader"

interface TableProps {
    fileLinks: FileLink[]
    sortLinks: SortLinks
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Table({ fileLinks, sortLinks }: TableProps) {
    return (
        <div className="grid grid-cols-files gap-3">
            <TableHeader sortLinks={sortLinks} />
            {fileLinks.map((fileLink) => {
                return <FileCard fileLink={fileLink} key={fileLink.href} />
            })}
        </div>
    )
}
