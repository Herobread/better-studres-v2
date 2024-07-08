import { FullFileLink } from "@src/features/parser"
import { compareTrackedMinimizedFileLinks } from "./fileMetrics"
import { isFileLinkTracked } from "./ignore"
import {
    TrackedFileLinkData,
    TrackedMinimizedFileLink,
    generateFileLinkKeyDeprecated,
    getTrackedFileLink,
    minimizeAndTrackFileLink,
    saveTrackedFileLinkToStorage,
} from "./storage"

/**
 * Tracks multiple file links.
 * @param {FileLink[]} fileLinks - The file links to track.
 * @returns {Promise<void>} A promise that resolves when all file links have been tracked.
 */
export async function trackFileLinks(fileLinks: FullFileLink[]): Promise<void> {
    for (const fileLink of fileLinks) {
        await trackFileLink(fileLink)
    }
}

/**
 * Tracks a file link.
 * @param {FileLink} fileLink - The file link to track.
 */
export async function trackFileLink(fileLink: FullFileLink) {
    if (!isFileLinkTracked(fileLink)) {
        return
    }

    const minimizedFileLink: TrackedMinimizedFileLink =
        minimizeAndTrackFileLink(fileLink)

    const key = generateFileLinkKeyDeprecated(fileLink)

    const record = await getTrackedFileLink(key)

    // new file
    if (!record) {
        const newTrackedFileLink: TrackedFileLinkData = {
            latestFileLink: minimizedFileLink,
            versions: [minimizedFileLink],
        }

        await saveTrackedFileLinkToStorage(key, newTrackedFileLink)

        return
    }

    // file exists
    const { versions, latestFileLink } = record

    const isNewVersion = !compareTrackedMinimizedFileLinks(
        minimizedFileLink,
        latestFileLink
    )

    if (isNewVersion) {
        record.latestFileLink = minimizedFileLink
        versions.push(minimizedFileLink)

        await saveTrackedFileLinkToStorage(key, record)

        return
    }
}
