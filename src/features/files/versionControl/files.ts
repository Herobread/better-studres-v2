import { getFileEmoji } from "@src/features/contentEnhancers/emoji/files"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import { getFileDataMap } from "../shared/storage"
import { BASE_URL, extractUrlSegments } from "../shared/urlSegments"
import { TAGS_FILE_DATA_KEY } from "../tags/storage"
import { VERSION_CONTROL_FILE_DATA_KEY } from "./storage"

export interface FileLinkPath {
    name: string
    href: string
    tags: string[]
}

export const GET_FORMATTED_FILES_LIST_FOR_COMMAND_QUERY_KEY =
    "getFormattedFilesListForCommand"

/**
 * Retrieves a list of files with their paths and formatted names.
 * @returns {Promise<FileLinkPath[]>} A promise that resolves to an array of file link paths.
 */
export async function getFormattedFilesListForCommand(): Promise<
    FileLinkPath[]
> {
    const fileDataMap = await getFileDataMap()
    const result: FileLinkPath[] = []

    for (const filePath in fileDataMap) {
        const minimizedFileLink =
            fileDataMap[filePath][VERSION_CONTROL_FILE_DATA_KEY]
        const tags = fileDataMap[filePath][TAGS_FILE_DATA_KEY]

        const tagNames = tags
            ? tags.map((tag) => {
                  return tag.name
              })
            : []

        if (!minimizedFileLink) {
            continue
        }

        const urlSegments = extractUrlSegments(
            minimizedFileLink.latestFileLink.rawHref
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
            tags: tagNames,
        })
    }

    return result
}
