import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import { extractUrlSegments } from "@src/features/files"

export function generateQuickLinkInfo(href: string) {
    const items = href.split("/")
    let name = items[3]

    if (items.length > 5) {
        name = items[3] + " - " + items[items.length - 2]
    }

    const urlSegments = extractUrlSegments(href || "")
    const moduleCode = urlSegments[0]
    const icon = getModuleEmoji(moduleCode)

    name = decodeURI(name)

    return {
        href,
        name,
        icon,
    }
}
