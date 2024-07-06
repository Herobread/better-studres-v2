import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { FullFileLink } from "../parser"
import { GET_TRACKED_FILE_LINK_QUERY_KEY_BASE } from "./versionControl/storage"
import { trackFileLinks } from "./versionControl/track"

interface FileMetricsTrackerProps {
    fileLinks: FullFileLink[]
}

/**
 * A component that tracks file metrics.
 * Used for command pallette and version control
 *
 * @param {FileMetricsTracker} props - The props for the component.
 * @returns {null} This component does not render anything.
 */
export function FileMetricsTracker({
    fileLinks,
}: FileMetricsTrackerProps): null {
    const queryClient = useQueryClient()

    useEffect(() => {
        async function track() {
            await trackFileLinks(fileLinks)
            queryClient.invalidateQueries({
                queryKey: [GET_TRACKED_FILE_LINK_QUERY_KEY_BASE],
            })
            queryClient.refetchQueries({
                queryKey: [GET_TRACKED_FILE_LINK_QUERY_KEY_BASE],
            })
        }

        track()
    })

    return null
}
