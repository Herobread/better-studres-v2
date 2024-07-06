import { FileLink } from "@src/types/pageContentTypes"
import {
    getFileData,
    getFileDataMap,
    saveFileData,
    setFileDataMap,
} from "../shared/storage"
import { BASE_URL } from "../shared/urlSegments"

export const TRACKED_FILE_LINK_MAP = "trackedFileLinkMap"

export type MinimizedFileLink = {
    href: string
    name: string
    size: number
    units: string
}

export type TrackerData = {
    lastModified: string
    detectedAt: number
}

export type TrackedMinimizedFileLink = MinimizedFileLink & TrackerData

export type TrackedFileLinkData = {
    latestFileLink: TrackedMinimizedFileLink
    versions: TrackedMinimizedFileLink[]
}

export type TrackedFileLinkMap = {
    [key: string]: TrackedFileLinkData
}

export type ChangesRecord = {
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
 * add fileLink.href to the key to create full key
 */
export const GET_TRACKED_FILE_LINK_QUERY_KEY_BASE = "getTrackedFileLink"

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
 * @returns {TrackedMinimizedFileLink} The minimized file link.
 */
export function minimizeAndTrackFileLink(
    fileLink: FileLink
): TrackedMinimizedFileLink {
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

export async function convertFileKeysToMinimizedFileLinks(fileKeys: string[]) {
    const fileDataMap = await getFileDataMap()

    const minimizedFileData: MinimizedFileLink[] = fileKeys.map((fileKey) => {
        const minimizedFileData =
            fileDataMap[fileKey][VERSION_CONTROL_FILE_DATA_KEY]?.latestFileLink

        if (!minimizedFileData) {
            const placeholderLinkData: MinimizedFileLink = {
                href: BASE_URL + fileKey,
                name: fileKey,
                size: 0,
                units: "",
            }

            return placeholderLinkData
        }

        return {
            ...minimizedFileData,
        }
    })

    return minimizedFileData
}

export async function clearVersionTrackingData() {
    const fileDataMap = await getFileDataMap()

    for (const fileKey in fileDataMap) {
        const fileData = fileDataMap[fileKey]

        if (fileData[VERSION_CONTROL_FILE_DATA_KEY]) {
            delete fileData[VERSION_CONTROL_FILE_DATA_KEY]
        }
    }

    await setFileDataMap(fileDataMap)
}
