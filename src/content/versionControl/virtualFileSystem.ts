import { FileLink } from "@src/types/pageContentTypes"
import { getFileEmoji } from "../enhancers/fileEmoji/getFileEmoji"
import { getModuleEmoji } from "../enhancers/moduleEmoji/getModuleEmoji"

/**
 * @deprecated Will be deleted in version 2.1
 */
export async function getFiles() {
    return (await chrome.storage.local.get("files")) as VirtualFileSystem
}

export const BASE_URL = "https://studres.cs.st-andrews.ac.uk/"

/**
 * @deprecated Will be deleted in version 2.1
 */
export function converturlSegmentsToUrl(path: string[]) {
    return BASE_URL + path.join("/") + "/"
}

export interface VirtualFileSystem {
    [key: string]: VirtualFileSystem | null
}

export interface VirtualFileSystemCommand {
    name: string
    href: string
}

/**
 * @deprecated Will be deleted in version 2.1
 */
export function mapVirtualFilesToList(
    files: VirtualFileSystem,
    parentPath: string[] = []
): VirtualFileSystemCommand[] {
    // Initialize the array to store results
    const result: VirtualFileSystemCommand[] = []

    for (const key in files) {
        // If the key is actually part of the object (as opposed to inherited properties)
        if (Object.prototype.hasOwnProperty.call(files, key)) {
            // Build the full path for the current file/directory
            const currentPath = parentPath.concat(key)

            const moduleCode = currentPath[0]
            const moduleEmoji = getModuleEmoji(moduleCode)
            let name = `${moduleEmoji} ${moduleCode}`

            if (currentPath.length > 1) {
                // works for most of the folders
                const isFolder =
                    !currentPath[currentPath.length - 1].includes(".")
                const folderChar = isFolder ? "/" : ""

                const fileName = decodeURI(currentPath[currentPath.length - 1])
                const fileEmoji = getFileEmoji(fileName + folderChar)

                name += ` - ${fileEmoji} ${fileName}`
            }

            result.push({
                name,
                href: BASE_URL + currentPath.join("/"),
            })

            if (files[key] !== null) {
                const subdir = files[key]
                if (subdir !== null) {
                    const subdirFiles = mapVirtualFilesToList(
                        subdir,
                        currentPath
                    )
                    result.push(...subdirFiles)
                }
            }
        }
    }

    return result
}

/**
 * @deprecated Will be deleted in version 2.1
 */
export async function saveFileLinks(fileLinks: FileLink[]) {
    let { files }: VirtualFileSystem = await chrome.storage.local.get("files")

    if (!files) {
        files = {}
    }

    fileLinks.forEach((fileLink) => {
        const { urlSegments } = fileLink
        savePathToObject(files, urlSegments)
    })

    await chrome.storage.local.set({ files })
}

/**
 * @deprecated Will be deleted in version 2.1
 */
export async function saveFileLink(fileLink: FileLink) {
    const { urlSegments } = fileLink
    let { files }: VirtualFileSystem = await chrome.storage.local.get("files")

    if (!files) {
        files = {}
    }

    savePathToObject(files, urlSegments)

    await chrome.storage.local.set({ files })
}

/**
 * @deprecated Will be deleted in version 2.1
 */
export function savePathToObject(
    files: VirtualFileSystem,
    urlSegments: string[]
) {
    let currentLevel: VirtualFileSystem | null = files

    for (let i = 0; i < urlSegments.length; i++) {
        const pathItem = urlSegments[i]

        if (!currentLevel) {
            break
        }

        if (!currentLevel[pathItem]) {
            currentLevel[pathItem] = {}
        }

        // reached the limit of what the path can give us
        if (i === urlSegments.length - 1) {
            // currentLevel[pathItem] = null
            break
        }

        currentLevel = currentLevel[pathItem] || null
    }

    return files
}
