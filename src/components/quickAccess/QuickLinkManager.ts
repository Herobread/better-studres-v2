import { QuickLink, RawQuickLink } from "@src/types/pageContentTypes"

export async function addQuickLink(rawQuickLink: RawQuickLink) {
    const result = await chrome.storage.local.get("quickLinks")
    let currentLinks: QuickLink[] = result.quickLinks

    const isValidArray =
        typeof currentLinks != "undefined" &&
        Array.isArray(currentLinks) &&
        currentLinks.length > 0

    if (!isValidArray) {
        currentLinks = []
    }

    const now = new Date()

    currentLinks.push({ id: now.getTime(), ...rawQuickLink })

    console.log(currentLinks)

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

export async function deleteQuickLink(id: number) {
    const quickLinks = await loadQuickLinks()

    const index = quickLinks.findIndex((quickLink) => quickLink.id === id)
    quickLinks.splice(index, 1)

    await chrome.storage.local.set({ quickLinks: quickLinks })
}