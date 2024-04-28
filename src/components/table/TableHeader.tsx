import { SortLinks } from "@src/types/pageContentTypes"
import SortHeader from "./SortHeader"

interface TableHeaderProps {
	sortLinks: SortLinks
}

export default function TableHeader({ sortLinks }: TableHeaderProps) {
	console.log(sortLinks)
	return <div className="grid p-3 gap-3 grid-cols-subgrid col-span-full items-center">
		<div></div> {/* icon */}
		<div></div> {/* separator */}
		<SortHeader column="Name" href={sortLinks["Name"]} style={"bold"}>Name</SortHeader>
		<div className="flex justify-end">
			<SortHeader column="Size" href={sortLinks["Size"]}>Size</SortHeader>
		</div>
		<div></div> {/* units */}
		<div className="flex justify-end">
			<SortHeader column="Last modified" href={sortLinks["Last modified"]}>Modified</SortHeader>
		</div>
	</div>
}