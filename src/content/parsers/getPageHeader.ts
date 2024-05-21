export function getPageHeader(content: HTMLElement): string {
    const h1 = content.querySelector("h1")
    return h1?.textContent || ""
}
