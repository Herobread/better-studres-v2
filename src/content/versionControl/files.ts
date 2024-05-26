import { getFileEmoji } from "../enhancers/fileEmoji/getFileEmoji"
import { getModuleEmoji } from "../enhancers/moduleEmoji/getModuleEmoji"
import { getTrackedFileLinkMap } from "./storage"
import { extractUrlSegments, BASE_URL } from "./urlSegments"

export interface FileLinkPath {
    name: string
    href: string
}

/**
 * Retrieves a list of files with their paths and formatted names.
 * @returns {Promise<FileLinkPath[]>} A promise that resolves to an array of file link paths.
 */
export async function getFormattedFilesList(): Promise<FileLinkPath[]> {
    const trackedFileLinkMap = await getTrackedFileLinkMap()
    const result: FileLinkPath[] = []

    for (const filePath in trackedFileLinkMap) {
        const minimizedFileLink = trackedFileLinkMap[filePath]
        const urlSegments = extractUrlSegments(
            minimizedFileLink.latestFileLink.href
        )

        const moduleCode = urlSegments[0]
        const moduleEmoji = getModuleEmoji(moduleCode)
        let name = `${moduleEmoji} ${moduleCode}`

        if (urlSegments.length > 1) {
            // works for most of the folders
            const isFolder = !urlSegments[urlSegments.length - 1].includes(".")
            const folderChar = isFolder ? "/" : ""

            const fileName = decodeURI(urlSegments[urlSegments.length - 1])
            const fileEmoji = getFileEmoji(fileName + folderChar)

            name += ` - ${fileEmoji} ${fileName}`
        }

        result.push({
            href: BASE_URL + filePath,
            name,
        })
    }

    return result
}
