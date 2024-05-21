import { FileLink, SortLinks } from "../../../types/pageContentTypes"
import { getTableRows } from "./getTableRows"
import { parseFileLinkRows } from "./parseFileLinkRows"
import { parseHeaderRow } from "./parseHeaderRow"

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
