import { useQuery } from "@tanstack/react-query"
import ChangesRecordCard from "./ChangesRecordCard"
import { generateChangeRecords, generateFileLinkKey, getTrackedFileLink } from "@src/content/versionControl/fileMetrics"
import { FileLink } from "@src/types/pageContentTypes"

interface UpdatesDialogProps {
	fileLink: FileLink
}

export default function UpdatesDialog({ fileLink }: UpdatesDialogProps) {
	const { data } = useQuery({
		queryKey: ['CS1006/0-General/cs1006-p2-groups.txt'],
		queryFn: async () => { return await getTrackedFileLink(generateFileLinkKey(fileLink)) }
	})

	const filename = fileLink.name + (fileLink.extension ? '.' + fileLink.extension : '')

	return <div className="space-y-3">
		<div className="space-y-1">
			<h2 className="text-xl font-bold">Version history of {fileLink.emoji}{filename}</h2>
			<p className="text-muted-foreground">Note: updates are only tracked locally.</p>
		</div>
		<div className="grid grid-cols-[max-content_1fr] gap-2">
			{
				data && <ChangesRecordCard changeRecords={generateChangeRecords(data)} />
			}
		</div>
	</div>
}