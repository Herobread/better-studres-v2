import { BASE_URL } from "@src/features/files"

export function getPotentialUrlType(url: string) {
    if (!url.includes(BASE_URL)) {
        return "remote"
    }

    if (url === BASE_URL) {
        return "root"
    }

    if (url.endsWith("/")) {
        return "folder"
    }

    // if its file or folder with some query params - skip
    const lastSlashIndex = url.lastIndexOf("/")
    const lastSegment = url.substring(lastSlashIndex + 1, url.length)

    if (lastSegment?.includes(".")) {
        return "file"
    }

    if (lastSegment?.includes("?") || lastSegment?.includes("=")) {
        return "folder"
    }

    return "unknown"
}
