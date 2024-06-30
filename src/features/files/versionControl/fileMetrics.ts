import {
    ChangesRecord,
    MinimizedFileLink,
    TrackedFileLinkData,
} from "./storage"

/**
 * Generates change records based on tracked file link data.
 * @param {TrackedFileLinkData} trackedFileLinkData - The tracked file link data.
 * @returns {ChangesRecord[]} An array of change records.
 */
export function generateChangeRecords(
    trackedFileLinkData: TrackedFileLinkData
): ChangesRecord[] {
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
