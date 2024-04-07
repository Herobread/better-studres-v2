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

    const image: Image = {
        alt: imageDataCell.getAttribute("alt") || undefined,
        src: imageDataCell.getAttribute("src") || undefined,
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

    const size = sizeDataCell.textContent || ""

    if (!descriptionDataCell) {
        throw new Error("No descripiton cell found")
    }

    const description = descriptionDataCell.textContent || ""

    return {
        name,
        href,
        description,
        size,
        lastModified,
        image,
    }
}
