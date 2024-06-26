import { FileLink, Image } from "@src/types/pageContentTypes"

import { extractUrlSegments } from "@src/features/files"
import { splitFileName, parseFileSize } from "@src/features/parser"
import { getTimeDifferenceString } from "@src/features/contentEnhancers/getTimeDifferenceString"
import { getFileEmoji } from "@src/features/contentEnhancers/emoji/files"

const IMAGE_FILE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "svg"]

export function parseFileLinkRows(
    fileLinkRows: HTMLTableRowElement[]
): FileLink[] {
    const fileLinks: FileLink[] = []

    fileLinkRows.forEach((linkRow) => {
        fileLinks.push(parseFileLinkRow(linkRow))
    })

    return fileLinks
}

function parseFileLinkRow(fileLinkRows: HTMLTableRowElement): FileLink {
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

    const image: Image = {
        alt: imageElement.getAttribute("alt") || undefined,
        src: imageElement.getAttribute("src") || undefined,
    }

    const nameDataCellAnchor = nameDataCell.querySelector("a")

    if (!nameDataCellAnchor) {
        throw new Error("No name cell found")
    }

    const rawName = nameDataCellAnchor.textContent || ""
    const { extension, name } = splitFileName(rawName)

    let isImage = false

    IMAGE_FILE_EXTENSIONS.forEach((imageExtension) => {
        if (extension?.toLowerCase() === imageExtension) {
            isImage = true
        }
    })

    // href is full link
    const href = nameDataCellAnchor.href || ""
    // this might be full link or "/some/path"
    const hrefAttributeValue = nameDataCellAnchor.getAttribute('href') || ''

    const urlSegments = extractUrlSegments(href)

    if (!lastModifiedDataCell) {
        throw new Error("No last modified cell found")
    }

    const lastModified = lastModifiedDataCell.textContent || ""
    const now = new Date()
    const lastModifiedDate = new Date(lastModified)
    const lastModifiedRelative = getTimeDifferenceString(lastModifiedDate, now)

    if (!sizeDataCell) {
        throw new Error("No size cell found")
    }

    const rawSize = sizeDataCell.textContent || ""
    const space = parseFileSize(rawSize)

    if (!descriptionDataCell) {
        throw new Error("No description cell found")
    }

    let rawDescription = descriptionDataCell.textContent

    if (rawDescription && rawDescription.replace(/\s{2,}/g, " ")) {
        rawDescription = null
    }

    const description = rawDescription || undefined

    const emoji = getFileEmoji(rawName)

    const isFolder =
        rawName.endsWith("/") || rawName.includes("Parent Directory")

    const fullName = rawName

    return {
        fullName,
        name,
        isFolder,
        extension,
        emoji,
        href,
        hrefAttributeValue,
        urlSegments,
        description,
        space,
        lastModifiedDate,
        lastModified,
        lastModifiedRelative,
        image,
        isImage,
    }
}
