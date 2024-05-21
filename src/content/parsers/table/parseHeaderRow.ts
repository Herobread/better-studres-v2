import { SortLinks } from "@src/types/pageContentTypes"

export function parseHeaderRow(headerRow: HTMLTableRowElement): SortLinks {
    const sortLinkHeaders = headerRow.querySelectorAll("th")
    const sortLinks: SortLinks = {}

    sortLinkHeaders.forEach((linkHeader) => {
        const anchor = linkHeader.querySelector("a")

        if (!anchor) {
            return
        }

        const name = anchor.textContent || ""
        const href = anchor.href

        sortLinks[name] = href
    })

    return sortLinks
}
