import { getFileEmoji } from "../enhancers/fileEmoji/getFileEmoji"
import { getModuleEmoji } from "../enhancers/moduleEmoji/getModuleEmoji"
import { getTrackedFileLinkMap } from "./fileMetrics"
import extractUrlSegments, { BASE_URL } from "./urlSegments"

export interface FileLinkPath {
    name: string
    href: string
}

export async function getFilesList(): Promise<FileLinkPath[]> {
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
