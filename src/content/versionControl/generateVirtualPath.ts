/**
 * @deprecated Will be deleted in version 2.1
 */
export default function generateVirtualPath(href: string) {
    const path = href.split("/")

    // remove start
    path.splice(0, 3)

    // remove empty end part
    if (path[path.length - 1] === "") {
        path.pop()
    }

    // remove sort
    if (path[path.length - 1] && path[path.length - 1].startsWith("?")) {
        path.pop()
    }

    return path
}
