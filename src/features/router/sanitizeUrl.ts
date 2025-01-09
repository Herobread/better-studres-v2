import { BASE_URL } from "@src/features/files"

/**
 * studres navigation will break if the url doesnt have trailing slash in folder
 *
 * this function is used to add it when needed
 *
 * @param url
 */
export function sanitizeUrl(url: string) {
    if (url.endsWith("/")) {
        return url
    }

    if (!url.includes(BASE_URL)) {
        return url
    }

    // if its file or folder with some query params - skip
    const lastSlashIndex = url.lastIndexOf("/")
    const lastSegment = url.substring(lastSlashIndex + 1, url.length)

    if (
        lastSegment?.includes(".") ||
        lastSegment?.includes("?") ||
        lastSegment?.includes("=")
    ) {
        return url
    }

    return url + "/"
}
