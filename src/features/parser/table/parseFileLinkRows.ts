import { getFileEmoji } from "@src/features/contentEnhancers/emoji/files"
import { getTimeDifferenceString } from "@src/features/contentEnhancers/getTimeDifferenceString"
import { extractUrlSegments, generateFileKey } from "@src/features/files"
import { Image } from "@src/types/pageContentTypes"
import { parseFileSize } from "../parseFileSize"
import { splitFileName } from "../splitFileName"

export function parseFileLinkRows(
    fileLinkRows: HTMLTableRowElement[]
): FullFileLink[] {
    const fileLinks: FullFileLink[] = []

    fileLinkRows.forEach((linkRow) => {
        const baseFileLink = parseFileLinkRow(linkRow)
        const fullFileLink = expandBaseFileLink(baseFileLink)

        fileLinks.push(fullFileLink)
    })

    return fileLinks
}

export type BaseFileLink = {
    rawName: string
    rawDescription: string | undefined
    rawImage: Image
    rawHrefAttribute: string
    rawHref: string
    rawLastModified: string
    rawSize: string
}

export function parseFileLinkRow(
    fileLinkRows: HTMLTableRowElement
): BaseFileLink {
    const fields = fileLinkRows.querySelectorAll("td")

    const [
        imageDataCell,
        nameDataCell,
        lastModifiedDataCell,
        sizeDataCell,
        descriptionDataCell,
    ] = fields

    if (!imageDataCell) {
        throw new Error("No image data cell found")
    }

    const imageElement = imageDataCell.querySelector("img")

    if (!imageElement) {
        throw new Error("No image data found inside the cell")
    }

    const rawImage: Image = {
        alt: imageElement.getAttribute("alt") || undefined,
        src: imageElement.getAttribute("src") || undefined,
    }

    const nameDataCellAnchor = nameDataCell.querySelector("a")

    if (!nameDataCellAnchor) {
        throw new Error("No name cell found")
    }

    const rawName = nameDataCellAnchor.textContent || ""

    // href is full link
    const rawHref = nameDataCellAnchor.href || ""
    // this might be full link or "/some/path"
    const rawHrefAttribute = nameDataCellAnchor.getAttribute("href") || ""

    if (!lastModifiedDataCell) {
        throw new Error("No last modified cell found")
    }

    const rawLastModified = lastModifiedDataCell.textContent || ""

    if (!sizeDataCell) {
        throw new Error("No size cell found")
    }

    const rawSize = sizeDataCell.textContent || ""

    if (!descriptionDataCell) {
        throw new Error("No description cell found")
    }

    let rawDescription = descriptionDataCell.textContent || undefined
    const isDescriptionEmpty =
        rawDescription && rawDescription.replace(/\s{2,}/g, " ")

    if (isDescriptionEmpty) {
        rawDescription = undefined
    }

    return {
        rawHref,
        rawHrefAttribute,
        rawLastModified,
        rawImage,
        rawSize,
        rawName,
        rawDescription,
    }
}

export type FileSize = {
    /** original value e.g. 450K */
    raw: string
    value: number
    measure: string
}

export type FullFileLink = {
    /** Source from where all extra data was generated */
    base: BaseFileLink

    // File data
    /** emoji that represents the format of the file */
    emoji: string
    /** file name with extension */
    fullName: string
    /** file name without extension */
    name: string
    /** file extension */
    extension?: string
    /** file icon */
    icon: Image
    size?: FileSize
    lastModified: {
        /** original value in format YYYY-MM-DD HH:MM */
        raw: string
        /** time in seconds from 1970 when the file was edited */
        timestamp: number
        /** time difference string in human readable format */
        difference: string
    }

    // extra
    /** file key used for accessing locally stored data bout the file */
    fileKey: string
    /** array of strings that has path to the file */
    urlSegments: string[]

    // Other properties
    isFolder: boolean
    isImage: boolean
}

export function compressFullFileLink(fullFileLink: FullFileLink): BaseFileLink {
    return fullFileLink.base
}

export function expandBaseFileLink(baseFileLink: BaseFileLink): FullFileLink {
    const {
        rawDescription,
        rawHref,
        rawHrefAttribute,
        rawImage,
        rawLastModified,
        rawName,
        rawSize,
    } = baseFileLink

    const { extension, name } = splitFileName(rawName)

    const urlSegments = extractUrlSegments(rawHref)

    const lastModifiedDate = new Date(rawLastModified)

    const parsedFileSize = parseFileSize(rawSize)

    let size

    if (parsedFileSize) {
        size = {
            raw: rawSize,
            ...parsedFileSize,
        } as FileSize
    }

    return {
        base: baseFileLink,
        extension,
        name,
        fullName: rawName,
        emoji: getFileEmoji(rawName),
        fileKey: generateFileKey(urlSegments),
        icon: rawImage,
        isFolder: isFolder(rawName),
        isImage: isImageExtension(extension),
        lastModified: {
            raw: rawLastModified,
            difference: getTimeDifferenceFromNow(lastModifiedDate),
            timestamp: lastModifiedDate.getTime(),
        },
        urlSegments,
        size,
    }
}

function isFolder(rawName: string) {
    return rawName.endsWith("/") || rawName.includes("Parent Directory")
}

function isImageExtension(extension?: string): boolean {
    if (!extension) {
        return false
    }

    const IMAGE_FILE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "svg"]

    return !!IMAGE_FILE_EXTENSIONS.find((imageExtension) => {
        return extension?.toLowerCase() === imageExtension
    })
}

function getTimeDifferenceFromNow(comparisonDate: Date) {
    const now = new Date()

    return getTimeDifferenceString(comparisonDate, now)
}
