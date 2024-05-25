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

export async function getTrackedFileLink(
    key: string
): Promise<TrackedFileLinkData> {
    const trackedFileLinkMap = await getTrackedFileLinkMap()

    return trackedFileLinkMap[key]
}

export async function getTrackedFileLinkMap(): Promise<TrackedFileLinkMap> {
    const { trackedFileLinkMap: trackedFileLinkMapString } =
        await chrome.storage.local.get(TRACKED_FILE_LINK_MAP)

    return trackedFileLinkMapString
}

export const UNTRACKED_FILE_NAMES = ["../"]

export async function saveTrackedFileLinkToStorage(
    key: string,
    trackedFileLinkData: TrackedFileLinkData
) {
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

export async function trackFileLinks(fileLinks: FileLink[]) {
    for (const fileLink of fileLinks) {
        await trackFileLink(fileLink)
    }
}

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

export async function trackFileLink(fileLink: FileLink) {
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

export function generateFileLinkKey(fileLink: FileLink) {
    return fileLink.urlSegments.join("/")
}
