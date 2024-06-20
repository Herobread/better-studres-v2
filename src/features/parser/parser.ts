import { isNotFoundPage } from "@src/features/router/isNotFoundPage"
import { FileLink, SortLinks } from "../../types/pageContentTypes"
import { getPageHeader } from "./getPageHeader"
import { parseTable } from "@src/features/parser"
import { isRootPage } from "@src/features/router/isRootPage"

export type PageType = "folder" | "not found" | "root" | "unknown"

export interface BasePageData {
    type: PageType
}

export interface FolderContent {
    title: string
    sortLinks: SortLinks
    fileLinks: FileLink[]
    extraContent: string
}

export interface FolderPageData extends BasePageData {
    type: "folder"
    content: FolderContent
}

export interface NotFoundPageData extends BasePageData {
    type: "not found"
}

export interface RootPageData extends BasePageData {
    type: "root"
}

export interface UnknownPageData extends BasePageData {
    type: "unknown"
}

export type PageData =
    | FolderPageData
    | NotFoundPageData
    | RootPageData
    | UnknownPageData

/**
 * Parses the content of a page to extract its title, file links, and sort links.
 * @param {HTMLElement} content - The content of the page to parse.
 * @returns {BasePageData} An object containing the parsed page data.
 */
export function parsePageContent(content: HTMLElement): PageData {
    if (isNotFoundPage(content)) {
        return {
            type: "not found",
        }
    }

    if (isRootPage(content)) {
        return {
            type: "root",
        }
    }

    try {
        const title = getPageHeader(content)
        const { fileLinks, sortLinks, extraContent } = parseTable(content)

        if (fileLinks.length > 0) {
            return {
                type: "folder",
                content: {
                    title,
                    fileLinks,
                    sortLinks,
                    extraContent,
                },
            }
        }
        // eslint-disable-next-line no-empty
    } catch (error) {}

    return {
        type: "unknown",
    }
}
