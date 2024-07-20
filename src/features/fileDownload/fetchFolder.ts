import { saveAs } from "file-saver"
import JSZip from "jszip"
import { parsePageContent } from "../parser"
import { generateQuickLinkInfo } from "../quickAccess"
import { parseDocumentFromText } from "./parseDocumentFromText"

export interface FolderContent {
    [key: string]: FolderContent | Blob | undefined
}

export async function fetchFolder(
    url: string,
    baseUrl?: string
): Promise<FolderContent> {
    const result: FolderContent = {}

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
        return { [path]: blob } as FolderContent
    }

    if (pageData.type === "folder") {
        const {
            content: { fileLinks },
        } = pageData

        for (const fileLink of fileLinks) {
            if (fileLink.fullName === "Parent Directory") {
                continue
            }

            const folderContent = await fetchFolder(
                url + fileLink.hrefAttribute,
                baseUrl
            )

            if (!folderContent) {
                continue
            }

            for (const [path, content] of Object.entries(folderContent)) {
                result[path] = content
            }
        }
    }

    return result
}

export async function archiveAndSaveBlobs(
    folderContent: FolderContent,
    name?: string
) {
    const zip = new JSZip()

    name ??= "archive"

    const rootFolder = zip.folder(name)!

    for (const [path, blob] of Object.entries(folderContent)) {
        if (blob instanceof Blob) {
            rootFolder.file(path, blob)
        } else if (typeof blob === "object") {
            const folder = rootFolder.folder(path)
            addFolderToZip(folder!, blob)
        }
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, name + ".zip")
    })
}

function addFolderToZip(zipFolder: JSZip, folderContent: FolderContent) {
    for (const [path, blob] of Object.entries(folderContent)) {
        if (blob instanceof Blob) {
            zipFolder.file(path, blob)
        } else if (typeof blob === "object") {
            const subFolder = zipFolder.folder(path)
            addFolderToZip(subFolder!, blob)
        }
    }
}

export async function saveFolder(url: string) {
    const folderContent = await fetchFolder(url)
    let { name } = generateQuickLinkInfo(url)
    name = name.replaceAll(" - ", "-").replaceAll(" ", "_")
    await archiveAndSaveBlobs(folderContent, name)
}
