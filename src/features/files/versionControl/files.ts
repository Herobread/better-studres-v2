import { getFileEmoji } from "@src/features/contentEnhancers/emoji/files"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import { getFileDataMap } from "../shared/storage"
import { BASE_URL, extractUrlSegments } from "../shared/urlSegments"

export interface FileLinkPath {
    name: string
    href: string
}

/**
 * Retrieves a list of files with their paths and formatted names.
 * @returns {Promise<FileLinkPath[]>} A promise that resolves to an array of file link paths.
 */
export async function getFormattedFilesList(): Promise<FileLinkPath[]> {
    const fileDataMap = await getFileDataMap()
    const result: FileLinkPath[] = []

    for (const filePath in fileDataMap) {
        // const minimizedFileLink = fileDataMap[filePath][VERSION_CONTROL_FILE_DATA_KEY]
        const urlSegments = extractUrlSegments(filePath)

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
