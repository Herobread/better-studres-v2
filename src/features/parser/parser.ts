import { FullFileLink, parseTable } from "@src/features/parser"
import { parseFilePageContent } from "@src/features/parser/parseFilePageContent"
import { isFilePage } from "@src/features/router/isFilePage"
import { isNotFoundPage } from "@src/features/router/isNotFoundPage"
import { isRootPage } from "@src/features/router/isRootPage"
import { SortLinks } from "../../types/pageContentTypes"
import { getPageHeader } from "./getPageHeader"
import { ModuleContent, parseRootPage } from "./root/parseRootPageContent"

export type PageType = "folder" | "not found" | "root" | "file" | "unknown"

export interface BasePageData {
    type: PageType
}

export interface FolderContent {
    title: string
    sortLinks: SortLinks
    fileLinks: FullFileLink[]
    extraContent: string
}

export interface FolderPageData extends BasePageData {
    type: "folder"
    content: FolderContent
}

export interface NotFoundPageData extends BasePageData {
    type: "not found"
}

export interface RootContent{
    modules: ModuleContent[][]
    taught_students: ModuleContent[]
    sessions: ModuleContent[]
}

export interface RootPageData extends BasePageData {
    type: "root"
    content: RootContent
}

export interface FileContent {
    text: string
}

export interface FilePreviewPageData extends BasePageData {
    type: "file"
    content: FileContent
}

export interface UnknownPageData extends BasePageData {
    type: "unknown"
}

export type PageData =
    | FolderPageData
    | NotFoundPageData
    | RootPageData
    | UnknownPageData
    | FilePreviewPageData

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
        const { modules, taught_students, sessions } = parseRootPage(content)
        return {
            type: "root",
            content: {
                modules,
                taught_students,
                sessions
            } 
        } 
    }

    if (isFilePage(content)) {
        return {
            type: "file",
            content: parseFilePageContent(content),
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
