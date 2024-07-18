import { FileContent } from "@src/features/parser/parser"

export function parseFilePageContent(content: HTMLElement): FileContent {
    const code = content.getElementsByTagName("pre")[0].textContent

    return {
        text: code || "",
    }
}
