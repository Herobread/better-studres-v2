import { BASE_URL } from "./virtualFileSystem"

/**
 * @deprecated Will be deleted in version 2.1
 */
export default function generateUrlFromVirtualPath(urlSegments: string[]) {
    return BASE_URL + urlSegments.join("/")
}
