import { FileLink } from "@src/types/pageContentTypes"
import {
    getFileData,
    getFileDataMap,
    saveFileData,
    setFileDataMap,
} from "../shared/storage"
import { FILE_DATA_STORAGE_KEY } from "../shared/types"

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

export const VERSION_CONTROL_FILE_DATA_KEY = "version-control-data"

/**
 * Retrieves a tracked file link by key.
 * @param {string} key - The key of the tracked file link. You can use {@link generateFileLinkKey} to generate the key.
 * @returns {Promise<TrackedFileLinkData>} A promise that resolves to the tracked file link data.
 */
export async function getTrackedFileLink(
    key: string
): Promise<TrackedFileLinkData | undefined> {
    return await getFileData(key, VERSION_CONTROL_FILE_DATA_KEY)
}

/**
 * Saves tracked file link data to storage.
 * @param {string} fileKey - The key of the tracked file link. You can use {@link generateFileLinkKey} to generate the key.
 * @param {TrackedFileLinkData} trackedFileLinkData - The tracked file link data to save.
 * @returns {Promise<void>} A promise that resolves when the data has been saved.
 */
export async function saveTrackedFileLinkToStorage(
    fileKey: string,
    trackedFileLinkData: TrackedFileLinkData
): Promise<void> {
    await saveFileData(
        fileKey,
        VERSION_CONTROL_FILE_DATA_KEY,
        trackedFileLinkData
    )
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

export async function clearVersionTrackingData() {
    const fileDataMap = await getFileDataMap()

    for (const fileKey in fileDataMap) {
        const fileData = fileDataMap[fileKey]

        if (fileData[FILE_DATA_STORAGE_KEY]) {
            delete fileData[FILE_DATA_STORAGE_KEY]
        }
    }

    await setFileDataMap(fileDataMap)
}
