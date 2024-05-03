import { QuickLink } from "@src/types/pageContentTypes"

export default function generateQuickLinkInfo(href: string): QuickLink {
    const items = href.split("/")
    let name = items[3]

    if (items.length > 5) {
        name = items[3] + " - " + items[items.length - 2]
    }

    return {
        href,
        name,
    }
}
