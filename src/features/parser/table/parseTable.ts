import { SortLinks } from "../../../types/pageContentTypes"
import { getExtraContent } from "./getExtraContent"
import { getTableRows } from "./getTableRows"
import { FullFileLink, parseFileLinkRows } from "./parseFileLinkRows"
import { parseHeaderRow } from "./parseHeaderRow"

/**
 * Parses a table to extract sort links and file links.
 * @param {HTMLElement} content - The content of the table to parse.
 * @returns {{ sortLinks: SortLinks, fileLinks: FullFileLink[], extraContent: ReactNode }}
 */
export function parseTable(content: HTMLElement): {
    sortLinks: SortLinks
    fileLinks: FullFileLink[]
    extraContent: string
} {
    const tableRows = getTableRows(content)
    const extraContent = getExtraContent(content)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [headerRow, ...fileLinkRows] = tableRows

    // first row and last row are empty:
    fileLinkRows.shift()
    fileLinkRows.pop()

    const sortLinks: SortLinks = parseHeaderRow(headerRow)
    const fileLinks: FullFileLink[] = parseFileLinkRows(fileLinkRows)

    return { sortLinks, fileLinks, extraContent }
}
