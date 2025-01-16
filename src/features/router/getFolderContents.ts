import { parseDocumentFromText } from "@src/features/fileDownload"
import { extractUrlSegments } from "@src/features/files"
import { parsePageContent } from "@src/features/parser"

function isFileLikeUrl(url: string) {
    const urSegments = extractUrlSegments(url)

    return urSegments[urSegments.length - 1].includes(".")
}

export async function fetchFolderContent(
    url: string,
    baseUrl?: string
): Promise<string[]> {
    let result: string[] = []

    if (isFileLikeUrl(url)) {
        return [url]
    } else {
        result.push(url)
    }

    const page = await fetch(url)
    const blob = await page.blob()

    const htmlText = await blob.text()
    const document = await parseDocumentFromText(htmlText)
    const pageData = parsePageContent(document.body)

    if (!baseUrl) {
        baseUrl = url
    }

    if (pageData.type === "unknown") {
        const path = url.replace(baseUrl, "").replace(/^\//, "")
        return [baseUrl + path]
    }

    if (pageData.type === "folder") {
        const {
            content: { fileLinks },
        } = pageData

        for (const fileLink of fileLinks) {
            if (fileLink.fullName === "Parent Directory") {
                continue
            }

            const folderContent = await fetchFolderContent(
                url + fileLink.hrefAttribute,
                baseUrl
            )

            if (!folderContent) {
                continue
            }

            result = result.concat(folderContent)
        }
    }

    return result
}
