import { PageData } from "../../types/pageContentTypes"
import { getPageHeader } from "./getPageHeader"
import { parseTable } from "./table/parseTable"

/**
 * Parses the content of a page to extract its title, file links, and sort links.
 * @param {HTMLElement} content - The content of the page to parse.
 * @returns {PageData} An object containing the parsed page data.
 */
export function parsePageContent(content: HTMLElement): PageData {
    const title = getPageHeader(content)
    const { fileLinks, sortLinks } = parseTable(content)

    return {
        title,
        fileLinks,
        sortLinks,
    }
}
