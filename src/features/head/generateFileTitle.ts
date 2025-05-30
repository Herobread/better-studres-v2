import { extractUrlSegments } from "@src/features/files"

export function generateFileTitle(url: string): string {
    const urlSegments = extractUrlSegments(url)

    if (urlSegments.length == 1) {
        return `${urlSegments[0]}`
    }

    return `${urlSegments[0]} - ${urlSegments[urlSegments.length - 1]}`
}
