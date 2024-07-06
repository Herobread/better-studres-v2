export async function parseDocumentFromText(htmlText: string) {
    const parser = new DOMParser()
    const document = parser.parseFromString(htmlText, "text/html")

    return document
}
