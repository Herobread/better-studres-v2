export function isFilePage(body: HTMLElement) {
    if (
        body.getElementsByTagName("pre").length === 1 &&
        body.childNodes.length === 1
    ) {
        return true
    }

    return false
}
