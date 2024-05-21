export default function redirect(href: string, type?: "userClick" | "http") {
    if (!type || type == "userClick") {
        window.location.href = href

        return
    }

    if (type == "http") {
        window.location.replace(href)

        return
    }
}
