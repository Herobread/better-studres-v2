import { FileLink, SortLinks } from "../../../types/pageContentTypes"
import { getTableRows } from "./getTableRows"
import { parseFileLinkRows } from "./parseFileLinkRows"
import { parseHeaderRow } from "./parseHeaderRow"

/**
 * Parses a table to extract sort links and file links.
 * @param {HTMLElement} content - The content of the table to parse.
 * @returns {{ sortLinks: SortLinks, fileLinks: FileLink[] }} An object containing the sort links and file links.
 */
export function parseTable(content: HTMLElement): {
    sortLinks: SortLinks
    fileLinks: FileLink[]
} {
    const tableRows = getTableRows(content)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [headerRow, ...fileLinkRows] = tableRows

    // first row and last row are empty:
    fileLinkRows.shift()
    fileLinkRows.pop()

    const sortLinks: SortLinks = parseHeaderRow(headerRow)
    const fileLinks: FileLink[] = parseFileLinkRows(fileLinkRows)

    return { sortLinks, fileLinks }
}
