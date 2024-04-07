import { SortLink } from "@src/types/pageContentTypes"

export function parseHeaderRow(headerRow: HTMLTableRowElement): SortLink[] {
    const sortLinkHeaders = headerRow.querySelectorAll("th")
    const sortLinks: SortLink[] = []

    sortLinkHeaders.forEach((linkHeader) => {
        const anchor = linkHeader.querySelector("a")

        if (!anchor) {
            return
        }

        const name = anchor.textContent || ""
        const href = anchor.href

        sortLinks.push({
            href,
            name,
        })
    })

    return sortLinks
}
