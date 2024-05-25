import { trackFileLinks } from "@src/content/versionControl/fileMetrics"
import { FileLink } from "@src/types/pageContentTypes"
import { useEffect } from "react"

interface FileMeticsTrackerProps {
	fileLinks: FileLink[]
}

/**
 * A component that tracks file metrics.
 * Used for command pallette and version control 
 * 
 * @param {FileMetricsTrackerProps} props - The props for the component.
 * @returns {null} This component does not render anything.
 */
export default function FileMeticsTracker({ fileLinks }: FileMeticsTrackerProps) {
	useEffect(() => {
		trackFileLinks(fileLinks)
	})

	return null
}