import { parseDocumentFromText } from "@src/features/fileDownload"
import { BASE_URL, extractUrlSegments } from "@src/features/files"
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

    // if it's redirect and not to studres, than it's likely SSO
    if (page.status === 302 && !page.url.includes(BASE_URL)) {
        throw {
            name: "AuthError",
            message: "Auth required.",
            loginUrl: page.url,
        }
    }

    if (!page.ok) {
        throw {
            name: "FetchError",
            message: `${page.statusText}`,
        }
    }

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
