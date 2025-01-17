import { parseDocumentFromText } from "@src/features/fileDownload"
import { extractUrlSegments } from "@src/features/files"
import { parsePageContent } from "@src/features/parser"

export function isFileLikeUrl(url: string) {
    const urSegments = extractUrlSegments(url)

    return urSegments[urSegments.length - 1].includes(".")
}

export async function* streamFolderContents(
    url: string,
    baseUrl?: string
): AsyncGenerator<string, void, unknown> {
    if (isFileLikeUrl(url)) {
        yield url
        return
    } else if (baseUrl) {
        yield url
    }

    const page = await fetch(url)
    const blob = await page.blob()

    const htmlText = await blob.text()
    const document = await parseDocumentFromText(htmlText)
    const pageData = parsePageContent(document.body)

    if (!baseUrl) {
        baseUrl = url
    }

    if (pageData.type === "folder") {
        const {
            content: { fileLinks },
        } = pageData

        for (const fileLink of fileLinks) {
            if (fileLink.fullName === "Parent Directory") {
                continue
            }

            const contents = await streamFolderContents(
                url + fileLink.hrefAttribute,
                baseUrl
            )

            for await (const fileLink of contents) {
                yield fileLink
            }
        }
    }
}
