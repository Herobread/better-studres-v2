import {
    ChangesRecord,
    TrackedFileLinkData,
    TrackedMinimizedFileLink,
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
            before: [versions[0].rawSize, versions[0].rawLastModified],
        },
        version: "v0",
    })

    for (let i = 0; i < versions.length - 1; i++) {
        const version = versions[i]
        const nextVersion = versions[i + 1]

        const updatedFields = []

        const before: string[] = []
        const after: string[] = []

        if (version.rawSize !== nextVersion.rawSize) {
            before.push(version.rawSize)
            after.push(nextVersion.rawSize)

            updatedFields.push("Size")
        }

        if (version.rawLastModified !== nextVersion.rawLastModified) {
            before.push(version.rawLastModified)
            after.push(nextVersion.rawLastModified)

            updatedFields.push("Modification date")
        }

        result.push({
            changes: {
                before,
                after,
            },
            header: updatedFields.join(" and ") + " updated:",
            timestamp: new Date(nextVersion.detectedAt),
            version: "v" + (i + 1),
        })
    }

    return result
}

/**
 * Compares two minimized file links.
 * @param {TrackedMinimizedFileLink} minimizedFileLink1 - The first minimized file link.
 * @param {TrackedMinimizedFileLink} minimizedFileLink2 - The second minimized file link.
 * @returns {boolean} True if the file links are the same, false otherwise.
 */
export function compareTrackedMinimizedFileLinks(
    minimizedFileLink1: TrackedMinimizedFileLink,
    minimizedFileLink2: TrackedMinimizedFileLink
) {
    return (
        minimizedFileLink1.rawDescription ===
            minimizedFileLink2.rawDescription &&
        minimizedFileLink1.rawLastModified ===
            minimizedFileLink2.rawLastModified &&
        minimizedFileLink1.rawSize === minimizedFileLink2.rawSize
    )
}
