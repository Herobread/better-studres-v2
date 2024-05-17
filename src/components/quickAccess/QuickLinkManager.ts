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

export async function getQuickLink(id: number) {
    const quickLinks = await loadQuickLinks()

    const index = quickLinks.findIndex((quickLink) => quickLink.id === id)

    return quickLinks[index]
}

export async function updateQuickLink(id: number, quickLink: RawQuickLink) {
    const quickLinks = await loadQuickLinks()

    const index = quickLinks.findIndex((quickLink) => quickLink.id === id)

    quickLinks[index] = { id, ...quickLink }

    await chrome.storage.local.set({ quickLinks })
}

export async function deleteQuickLink(id: number) {
    const quickLinks = await loadQuickLinks()

    const index = quickLinks.findIndex((quickLink) => quickLink.id === id)
    quickLinks.splice(index, 1)

    await chrome.storage.local.set({ quickLinks: quickLinks })
}

export async function moveQuickLink(id: number, relativeOffset: number) {
    const quickLinks = await loadQuickLinks()

    const index = quickLinks.findIndex((quickLink) => quickLink.id === id)
    if (index === -1) {
        throw new Error(`Quick link with id ${id} not found`)
    }

    const newIndex = index + relativeOffset

    if (newIndex < 0 || newIndex >= quickLinks.length) {
        throw new Error(`New index ${newIndex} is out of bounds`)
    }

    // Move the quicklink
    const [movedLink] = quickLinks.splice(index, 1)
    quickLinks.splice(newIndex, 0, movedLink)

    await chrome.storage.local.set({ quickLinks: quickLinks })
}
