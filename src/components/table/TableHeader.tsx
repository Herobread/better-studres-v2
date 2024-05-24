import { SortLinks } from "@src/types/pageContentTypes"
import SortHeader from "./SortHeader"

interface TableHeaderProps {
    sortLinks: SortLinks
}

export default function TableHeader({ sortLinks }: TableHeaderProps) {
    return (
        <div className="col-span-full grid grid-cols-subgrid items-center gap-3 p-3">
            <span className="col-span-2"></span> {/* empty cell to replace icon and Separator */}
            <SortHeader column="Name" href={sortLinks["Name"]} style={"bold"}>
                Name
            </SortHeader>
            <div className="flex justify-end">
                <SortHeader column="Size" href={sortLinks["Size"]}>
                    Size
                </SortHeader>
            </div>
            <div></div> {/* units */}
            <div className="flex justify-end">
                <SortHeader
                    column="Last modified"
                    href={sortLinks["Last modified"]}
                >
                    Modified
                </SortHeader>
            </div>
        </div>
    )
}
