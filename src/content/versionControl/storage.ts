import { FileLink } from "@src/types/pageContentTypes"
import { isFileNameTracked } from "./ignore"

export const TRACKED_FILE_LINK_MAP = "trackedFileLinkMap"

export interface MinimizedFileLink {
    href: string
    name: string
    lastModified: string
    size: number
    units: string
    detectedAt: number
}

export interface TrackedFileLinkData {
    latestFileLink: MinimizedFileLink
    versions: MinimizedFileLink[]
}

export interface TrackedFileLinkMap {
    [key: string]: TrackedFileLinkData
}

export interface ChangesRecord {
    version: string
    header: string
    changes?: {
        before: string[]
        after?: string[]
    }
    timestamp: Date
}

/**
 * Generates a key for a file link.
 * @param {FileLink} fileLink - The file link to generate a key for.
 * @returns {string} The generated key.
 */
export function generateFileLinkKey(fileLink: FileLink) {
    return fileLink.urlSegments.join("/")
}

/**
 * Retrieves a tracked file link by key.
 * @param {string} key - The key of the tracked file link. You can use {@link generateFileLinkKey} to generate the key.
 * @returns {Promise<TrackedFileLinkData>} A promise that resolves to the tracked file link data.
 */
export async function getTrackedFileLink(
    key: string
): Promise<TrackedFileLinkData> {
    const trackedFileLinkMap = await getTrackedFileLinkMap()

    return trackedFileLinkMap[key]
}

/**
 * Retrieves the tracked file link map from storage.
 * @returns {Promise<TrackedFileLinkMap>} A promise that resolves to the tracked file link map.
 */
export async function getTrackedFileLinkMap(): Promise<TrackedFileLinkMap> {
    const { trackedFileLinkMap: trackedFileLinkMapString } =
        await chrome.storage.local.get(TRACKED_FILE_LINK_MAP)

    return trackedFileLinkMapString
}

/**
 * Saves tracked file link data to storage.
 * @param {string} key - The key of the tracked file link. You can use {@link generateFileLinkKey} to generate the key.
 * @param {TrackedFileLinkData} trackedFileLinkData - The tracked file link data to save.
 * @returns {Promise<void>} A promise that resolves when the data has been saved.
 */
export async function saveTrackedFileLinkToStorage(
    key: string,
    trackedFileLinkData: TrackedFileLinkData
): Promise<void> {
    if (isFileNameTracked(trackedFileLinkData.latestFileLink.name)) {
        return
    }

    const currentData = await getTrackedFileLinkMap()

    const newData = currentData || {}

    newData[key] = trackedFileLinkData

    await chrome.storage.local.set({
        trackedFileLinkMap: newData,
    })
}
/**
 * Minimizes a file link.
 * @param {FileLink} fileLink - The file link to minimize.
 * @returns {MinimizedFileLink} The minimized file link.
 */
export function minimizeFileLink(fileLink: FileLink): MinimizedFileLink {
    const { name, href, lastModified, space } = fileLink

    const detectedAt = new Date().getTime()

    if (!space) {
        return {
            href,
            name,
            lastModified,
            size: 0,
            units: "B",
            detectedAt,
        }
    }

    return {
        href,
        name,
        lastModified,
        detectedAt,
        ...space,
    }
}
