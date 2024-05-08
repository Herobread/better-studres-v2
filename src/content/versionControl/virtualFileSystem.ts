import { FileLink } from "@src/types/pageContentTypes"

// let data = {}

// export function saveFileLinks(fileLinks: FileLink[]) {}
export async function getFiles() {
    return (await chrome.storage.local.get("files")) as VirtualFileSystem
}

export function convertVirtualPathToUrl(path: string[]) {
    return "https://studres.cs.st-andrews.ac.uk/" + path.join("/") + "/"
}

export interface VirtualFileSystem {
    [key: string]: VirtualFileSystem | null
}

export interface VirtualFileSystemCommand {
    name: string
    href: string
}

export function mapVirtualFilesToList(
    files: VirtualFileSystem,
    parentPath: string[] = [],
): VirtualFileSystemCommand[] {
    // Initialize the array to store results
    const result: VirtualFileSystemCommand[] = []
    const BASE_URL = "https://studres.cs.st-andrews.ac.uk/"

    for (const key in files) {
        // If the key is actually part of the object (as opposed to inherited properties)
        if (Object.prototype.hasOwnProperty.call(files, key)) {
            // Build the full path for the current file/directory
            const currentPath = parentPath.concat(key)

            let name = `${currentPath[0]}`

            if (currentPath.length > 1) {
                name = `${currentPath[0]} - ${currentPath[currentPath.length - 1]}`
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
                        currentPath,
                    )
                    result.push(...subdirFiles)
                }
            }
        }
    }

    return result
}

export async function saveFileLinks(fileLinks: FileLink[]) {
    let { files }: VirtualFileSystem = await chrome.storage.local.get("files")

    if (!files) {
        files = {}
    }

    fileLinks.forEach((fileLink) => {
        const { virtualPath } = fileLink
        savePathToObject(files, virtualPath)
    })

    await chrome.storage.local.set({ files })
}

export async function saveFileLink(fileLink: FileLink) {
    const { virtualPath } = fileLink
    let { files }: VirtualFileSystem = await chrome.storage.local.get("files")

    if (!files) {
        files = {}
    }

    savePathToObject(files, virtualPath)

    await chrome.storage.local.set({ files })
}

export function savePathToObject(
    files: VirtualFileSystem,
    virtualPath: string[],
) {
    let currentLevel: VirtualFileSystem | null = files

    for (let i = 0; i < virtualPath.length; i++) {
        const pathItem = virtualPath[i]

        if (!currentLevel) {
            break
        }

        if (!currentLevel[pathItem]) {
            currentLevel[pathItem] = {}
        }

        // reached the limit of what the path can give us
        if (i === virtualPath.length - 1) {
            // currentLevel[pathItem] = null
            break
        }

        currentLevel = currentLevel[pathItem] || null
    }

    return files
}
