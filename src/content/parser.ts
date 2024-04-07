import { PageData } from "../types/pageContentTypes"
import { getPageHeader } from "./getPageHeader"
import { parseTable } from "./table/parseTable"

export function parsePageContent(content: HTMLElement): PageData {
    const title = getPageHeader(content)
    const { fileLinks, sortLinks } = parseTable(content)

    return {
        title,
        fileLinks,
        sortLinks,
    }
}
