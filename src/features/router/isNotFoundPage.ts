export function isNotFoundPage(body: HTMLElement) {
    const headings = body.getElementsByTagName("h1")

    const firstHeading = headings[0]

    if (!firstHeading) {
        return false
    }

    if (firstHeading.textContent === "Not Found") {
        return true
    }

    return false
}
