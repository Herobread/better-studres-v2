import { FileLink } from "@src/types/pageContentTypes"

// let data = {}

// export function saveFileLinks(fileLinks: FileLink[]) {}
export async function getFiles() {
    return await chrome.storage.local.get("files")
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

export interface VirtualFileSystem {
    [key: string]: VirtualFileSystem | null
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
