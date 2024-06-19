export function isRootPage(body: HTMLElement) {
    const headings = body.getElementsByTagName("h1")
    const firstHeading = headings[0]

    if (!firstHeading) {
        return false
    }

    if (firstHeading.textContent === "Student Resources") {
        return true
    }

    return false
}
