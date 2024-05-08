export default function generateVirtualPath(href: string) {
    const path = href.split("/")

    // remove start
    path.splice(0, 3)

    // remove empty end part
    if (path[path.length - 1] === "") {
        path.pop()
    }

    return path
}
