import { getFileEmoji } from "@src/content/enhancers/getFileEmoji"
import parseFileSize from "@src/content/utils/parseFileSize"
import { FileLink, Image } from "@src/types/pageContentTypes"

export function parseFileLinkRows(
    fileLinkRows: HTMLTableRowElement[],
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

    const name = nameDataCellAnchor.textContent || ""
    const href = nameDataCellAnchor.href || ""

    if (!lastModifiedDataCell) {
        throw new Error("No last modified cell found")
    }

    const lastModified = lastModifiedDataCell.textContent || ""

    if (!sizeDataCell) {
        throw new Error("No size cell found")
    }

    const rawSize = sizeDataCell.textContent || ""
    const space = parseFileSize(rawSize)

    if (!descriptionDataCell) {
        throw new Error("No descripiton cell found")
    }

    const description = descriptionDataCell.textContent || ""

    const emoji = getFileEmoji(name)

    return {
        name,
        emoji,
        href,
        description,
        space,
        lastModified,
        image,
    }
}
