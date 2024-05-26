import { FileLink } from "@src/types/pageContentTypes"
import {
    MinimizedFileLink,
    TrackedFileLinkData,
    generateFileLinkKey,
    getTrackedFileLink,
    minimizeFileLink,
    saveTrackedFileLinkToStorage,
} from "./storage"
import { compareMinimizedFileLinks } from "./fileMetrics"
import { isFileLinkTracked } from "./ignore"

/**
 * Tracks multiple file links.
 * @param {FileLink[]} fileLinks - The file links to track.
 * @returns {Promise<void>} A promise that resolves when all file links have been tracked.
 */
export async function trackFileLinks(fileLinks: FileLink[]): Promise<void> {
    for (const fileLink of fileLinks) {
        await trackFileLink(fileLink)
    }
}

/**
 * Tracks a file link.
 * @param {FileLink} fileLink - The file link to track.
 */
export async function trackFileLink(fileLink: FileLink) {
    if (!isFileLinkTracked(fileLink)) {
        return
    }

    const minimizedFileLink: MinimizedFileLink = minimizeFileLink(fileLink)

    const key = generateFileLinkKey(fileLink)

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

    const isNewVersion = !compareMinimizedFileLinks(
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
