import { trackFileLinks } from "@src/content/versionControl"
import { FileLink } from "@src/types/pageContentTypes"
import { useEffect } from "react"

interface FileMetricsTrackerProps {
    fileLinks: FileLink[]
}

/**
 * A component that tracks file metrics.
 * Used for command pallette and version control
 *
 * @param {FileMetricsTracker} props - The props for the component.
 * @returns {null} This component does not render anything.
 */
export default function FileMetricsTracker({
    fileLinks,
}: FileMetricsTrackerProps): null {
    useEffect(() => {
        trackFileLinks(fileLinks)
    })

    return null
}
