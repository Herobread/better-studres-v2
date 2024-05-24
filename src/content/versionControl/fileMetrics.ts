import { FileLink } from "@src/types/pageContentTypes"

// export interface FileChange {
// 	field: 'modified' | 'size'
// 	info: string
// }

// export interface FileStatus {
//     changes?: FileChange[]
// }

export const TRACKED_FILE_LINK_MAP = "trackedFileLinkMap"

export interface MinimizedFileLink {
    href: string
    name: string
    lastModified: string
    size: number
    units: string
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

export async function saveTrackedFileLinkToStorage(
    key: string,
    trackedFileLinkData: TrackedFileLinkData
) {
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

// export function compareFileLinks(fileLink1: FileLink, fileLink2: FileLink) {
//     // why not just deepEqual()?
//     // chrome serializes in weird way and doesn't properly save objects, classes
//     return (
//         fileLink1.lastModified === fileLink2.lastModified &&
//         fileLink1.lastModified === fileLink2.lastModified
//     )
// }

export function minimizeFileLink(fileLink: FileLink): MinimizedFileLink {
    const { name, href, lastModified, space } = fileLink

    if (!space) {
        return {
            href,
            name,
            lastModified,
            size: 0,
            units: "-",
        }
    }

    return {
        href,
        name,
        lastModified,
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
        console.log("new file: " + fileLink.name)

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
        console.log("new version: " + fileLink.name)

        console.log(minimizedFileLink)
        console.log(latestFileLink)

        record.latestFileLink = minimizedFileLink
        versions.push(minimizedFileLink)

        await saveTrackedFileLinkToStorage(key, record)

        return true
    }

    console.log("no updates found for " + minimizedFileLink.name)
    // same as old file - do nothing
    return false
}

export function generateFileLinkKey(fileLink: FileLink) {
    return fileLink.virtualPath.join("/")
}
