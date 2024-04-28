import { FileLink } from "@src/types/pageContentTypes"
import FileCard from "./FileCard"

interface TableProps {
	fileLinks: FileLink[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Table({ fileLinks }: TableProps) {
	return <div className="grid grid-cols-files gap-3">
		{
			fileLinks.map(fileLink => {
				return <FileCard fileLink={fileLink} key={fileLink.href} />
			})
		}
	</div>
}