/**
 * Redirects the browser to a new URL based on the type of redirection.
 * @param {string} href - The URL to redirect to.
 * @param {"userClick" | "http"} [type] - The type of redirection. Defaults to "userClick".
 */
export function redirect(
    href: string,
    type?: "userClick" | "http",
    isBlank?: boolean
) {
    if (isBlank) {
        chrome.tabs.create({ url: href })
        return
    }

    if (!type || type === "userClick") {
        window.location.href = href
        return
    }

    if (type === "http") {
        window.location.replace(href)
        return
    }
}
