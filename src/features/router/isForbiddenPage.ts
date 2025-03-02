export function isForbiddenPage(body: HTMLElement) {
    const headings = body.getElementsByTagName("h1")

    const firstHeading = headings[0]

    if (!firstHeading) {
        return false
    }

    if (firstHeading.textContent === "Forbidden") {
        return true
    }

    return false
} 