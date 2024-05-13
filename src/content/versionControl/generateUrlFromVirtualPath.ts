import { BASE_URL } from "./virtualFileSystem"

export default function generateUrlFromVirtualPath(virtualPath: string[]) {
    return BASE_URL + virtualPath.join("/")
}
