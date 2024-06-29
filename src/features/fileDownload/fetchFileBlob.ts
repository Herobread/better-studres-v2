import { parsePageContent } from "../parser"
import { parseDocumentFromText } from "./parseDocumentFromText"

export async function fetchFileBlob(url: string) {
    const response = await fetch(url)

    const blob = await response.blob()
    const htmlText = await blob.text()

    const document = await parseDocumentFromText(htmlText)

    const { type } = parsePageContent(document.body)

    console.log(type);

    if (type === 'folder') {
        throw new Error('Not a file')
    }

    return blob
}