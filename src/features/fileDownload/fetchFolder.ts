import { generateQuickLinkInfo } from "@src/features/quickLinks"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import { parsePageContent } from "../parser"
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
    /*
     * Due to compatibility issues between Firefox and JSZip,
     * passing a Blob directly can cause problems.
     *
     * Thats why I am converting the Blob to a base64 string to ensure it works correctly.
     *
     * https://github.com/Herobread/better-studres-v2/issues/76
     */

    const zip = new JSZip()

    name ??= "archive"

    const rootFolder = zip.folder(name) as JSZip

    const addBlobToZip = async (path: string, blob: Blob) => {
        return new Promise<void>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                const base64url = reader.result as string
                const base64data = base64url.split(",")[1]
                rootFolder?.file(path, base64data, {
                    base64: true,
                })
                resolve()
            }
            reader.onerror = reject
        })
    }

    const processFolder = async (folder: JSZip, content: FolderContent) => {
        for (const [path, blob] of Object.entries(content)) {
            if (blob instanceof Blob) {
                await addBlobToZip(path, blob)
            } else if (typeof blob === "object") {
                const newFolder = folder.folder(path) as JSZip
                await processFolder(newFolder, blob)
            }
        }
    }

    await processFolder(rootFolder, folderContent)

    const content = await zip.generateAsync({ type: "blob" })
    saveAs(content, name + ".zip")
}

export async function saveFolder(url: string) {
    const folderContent = await fetchFolder(url)
    let { name } = generateQuickLinkInfo(url)
    name = name.replaceAll(" - ", "-").replaceAll(" ", "_")
    await archiveAndSaveBlobs(folderContent, name)

    return name
}
