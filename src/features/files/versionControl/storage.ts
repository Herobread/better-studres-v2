import { BaseFileLink, FullFileLink } from "@src/features/parser"
import {
    getFileData,
    getFileDataMap,
    saveFileData,
    setFileDataMap,
} from "../shared/storage"
import { BASE_URL } from "../shared/urlSegments"

export const TRACKED_FILE_LINK_MAP = "trackedFileLinkMap"

export type MinimizedFileLinkDeprecated = {
    href: string
    name: string
    size: number
    units: string
}

export type TrackerData = {
    detectedAt: number
}

export type TrackedMinimizedFileLink = BaseFileLink & TrackerData

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
 * @param {FullFileLink} fileLink - The file link to generate a key for.
 * @returns {string} The generated key.
 */
export function generateFileLinkKeyDeprecated(fileLink: FullFileLink) {
    return fileLink.urlSegments.join("/")
}

export function generateFileKey(urlSegments: string[]) {
    return urlSegments.join("/")
}

export const VERSION_CONTROL_FILE_DATA_KEY = "version-control-data"

/**
 * add fileLink.href to the key to create full key
 */
export const GET_TRACKED_FILE_LINK_QUERY_KEY_BASE = "getTrackedFileLink"

/**
 * Retrieves a tracked file link by key.
 * @param {string} key - The key of the tracked file link. You can use {@link generateFileLinkKeyDeprecated} to generate the key.
 * @returns {Promise<TrackedFileLinkData>} A promise that resolves to the tracked file link data.
 */
export async function getTrackedFileLink(
    key: string
): Promise<TrackedFileLinkData | undefined> {
    return (await getFileData(key, VERSION_CONTROL_FILE_DATA_KEY)) as
        | TrackedFileLinkData
        | undefined
}

/**
 * Saves tracked file link data to storage.
 * @param {string} fileKey - The key of the tracked file link. You can use {@link generateFileLinkKeyDeprecated} to generate the key.
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
 * @param {FullFileLink} fileLink - The file link to minimize.
 * @returns {TrackedMinimizedFileLink} The minimized file link.
 */
export function minimizeAndTrackFileLink(
    fileLink: FullFileLink
): TrackedMinimizedFileLink {
    const baseFileLink = fileLink.base

    const detectedAt = new Date().getTime()

    return {
        detectedAt,
        ...baseFileLink,
    }
}

export async function convertFileKeysToMinimizedFileLinks(fileKeys: string[]) {
    const fileDataMap = await getFileDataMap()

    const minimizedFileData: BaseFileLink[] = fileKeys.map((fileKey) => {
        const minimizedFileData =
            fileDataMap[fileKey][VERSION_CONTROL_FILE_DATA_KEY]?.latestFileLink

        if (!minimizedFileData) {
            const placeholderLinkData: BaseFileLink = {
                rawHref: BASE_URL + fileKey,
                rawHrefAttribute: BASE_URL + fileKey,
                rawDescription: "",
                rawName: fileKey,
                rawImage: {
                    alt: "",
                    src: "",
                },
                rawLastModified: "",
                rawSize: "",
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
