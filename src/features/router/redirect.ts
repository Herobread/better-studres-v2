/**
 * Redirects the browser to a new URL based on the type of redirection.
 * @param {string} href - The URL to redirect to.
 * @param {"userClick" | "http"} [type] - The type of redirection. Defaults to "userClick".
 */
export function redirect(href: string, type?: "userClick" | "http") {
    const isPopup = window.opener && window.opener !== window

    if (isPopup) {
        // Open the URL in a new tab and close the popup
        window.open(href, "_blank")
        window.close()
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
