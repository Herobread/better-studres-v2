/**
 * The base URL used as the prefix for constructing full URLs.
 */
export const BASE_URL = "https://studres.cs.st-andrews.ac.uk/"

export const MMS_BASE_URL = "https://mms.st-andrews.ac.uk/mms/"

export const MY_SAINT_BASE_URL =
    "https://mysaint.st-andrews.ac.uk/uPortal/f/home/normal/render.uP"

/**
 * Type alias for representing segments of a URL.
 */
export type UrlSegments = string[]

/**
 * Converts an array of URL segments into a full URL by appending them to the base URL.
 *
 * @param segments - The array of URL segments.
 * @returns The constructed full URL.
 */
export function convertUrlSegmentsToUrl(segments: UrlSegments): string {
    return BASE_URL + segments.join("/") + "/"
}

/**
 * Extracts the segments from a given URL, removing the protocol, domain, trailing slash,
 * and query parameters.
 *
 * @param url - The full URL to extract segments from.
 * @returns An array of URL segments.
 */
export function extractUrlSegments(url: string): UrlSegments {
    const segments = url.split("/")

    // Remove the protocol and domain parts
    segments.splice(0, 3)

    // Remove trailing empty part
    if (segments[segments.length - 1] === "") {
        segments.pop()
    }

    // Remove query parameters
    if (
        segments[segments.length - 1] &&
        segments[segments.length - 1].startsWith("?")
    ) {
        segments.pop()
    }

    return segments
}
