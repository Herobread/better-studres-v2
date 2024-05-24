import { trackFileLinks } from "@src/content/versionControl/fileMetrics"
import { FileLink } from "@src/types/pageContentTypes"
import { useEffect } from "react"

interface FileMeticsTrackerProps {
	fileLinks: FileLink[]
}

export default function FileMeticsTracker({ fileLinks }: FileMeticsTrackerProps) {
	useEffect(() => {
		trackFileLinks(fileLinks)
	})

	return null
}