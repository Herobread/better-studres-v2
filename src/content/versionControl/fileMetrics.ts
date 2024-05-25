import { FileLink } from "@src/types/pageContentTypes"

export const TRACKED_FILE_LINK_MAP = "trackedFileLinkMap"

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
 * Generates change records based on tracked file link data.
 * @param {TrackedFileLinkData} trackedFileLinkData - The tracked file link data.
 * @returns {ChangesRecord[]} An array of change records.
 */
export function generateChangeRecords(
    trackedFileLinkData: TrackedFileLinkData
) {
    const result: ChangesRecord[] = []

    const { versions } = trackedFileLinkData

    // initial
    result.push({
        header: "Initial version",
        timestamp: new Date(versions[0].detectedAt),
        changes: {
            before: [
                versions[0].size + versions[0].units,
                versions[0].lastModified,
            ],
        },
        version: "v0",
    })

    for (let i = 0; i < versions.length - 1; i++) {
        const version = versions[i]
        const nextVersion = versions[i + 1]

        const updatedFields = []

        const before: string[] = []
        const after: string[] = []

        if (
            version.size !== nextVersion.size ||
            version.units !== nextVersion.units
        ) {
            before.push(version.size + version.units)
            after.push(nextVersion.size + nextVersion.units)

            updatedFields.push("Size")
        }

        if (version.lastModified !== nextVersion.lastModified) {
            before.push(version.lastModified)
            after.push(nextVersion.lastModified)

            updatedFields.push("Modification date")
        }

        result.push({
            changes: {
                before,
                after,
            },
            header: updatedFields.join(" and ") + " updated:",
            timestamp: new Date(version.detectedAt),
            version: "v" + (i + 1),
        })
    }

    return result
}

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

export const UNTRACKED_FILE_NAMES = ["../"]

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
    if (
        UNTRACKED_FILE_NAMES.includes(trackedFileLinkData.latestFileLink.name)
    ) {
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

/**
 * Compares two minimized file links.
 * @param {MinimizedFileLink} minimizedFileLink1 - The first minimized file link.
 * @param {MinimizedFileLink} minimizedFileLink2 - The second minimized file link.
 * @returns {boolean} True if the file links are the same, false otherwise.
 */
export function compareMinimizedFileLinks(
    minimizedFileLink1: MinimizedFileLink,
    minimizedFileLink2: MinimizedFileLink
) {
    return (
        minimizedFileLink1.href === minimizedFileLink2.href &&
        minimizedFileLink1.name === minimizedFileLink2.name &&
        minimizedFileLink1.lastModified === minimizedFileLink2.lastModified &&
        minimizedFileLink1.size === minimizedFileLink2.size &&
        minimizedFileLink1.units === minimizedFileLink2.units
    )
}

/**
 * Tracks a file link.
 * @param {FileLink} fileLink - The file link to track.
 * @returns {Promise<boolean>} A promise that resolves to true if the file link is a new version, false otherwise.
 */
export async function trackFileLink(fileLink: FileLink): Promise<boolean> {
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

        return false
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

        return true
    }

    // same as old file - do nothing
    return false
}

/**
 * Generates a key for a file link.
 * @param {FileLink} fileLink - The file link to generate a key for.
 * @returns {string} The generated key.
 */
export function generateFileLinkKey(fileLink: FileLink) {
    return fileLink.urlSegments.join("/")
}
