import { QuickLink } from "@src/types/pageContentTypes"

export async function addQuickLink(quickLink: QuickLink) {
    const result = await chrome.storage.local.get("quickLinks")
    let currentLinks: QuickLink[] = result.quickLinks

    const isValidArray =
        typeof currentLinks != "undefined" &&
        Array.isArray(currentLinks) &&
        currentLinks.length > 0

    if (!isValidArray) {
        currentLinks = []
    }

    currentLinks.push(quickLink)

    await chrome.storage.local.set({ quickLinks: currentLinks })
}

export async function loadQuickLinks() {
    const quickLinks: QuickLink[] = await chrome.storage.local
        .get("quickLinks")
        .then((result) => {
            return result.quickLinks
        })

    return quickLinks
}

export async function deleteQuickLink(href: string) {
    const quickLinks = await loadQuickLinks()

    const index = quickLinks.findIndex((quickLink) => quickLink.href === href)
    quickLinks.splice(index)

    await chrome.storage.local.set({ quickLinks: quickLinks })
}
