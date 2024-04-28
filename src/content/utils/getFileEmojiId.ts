export function getFileEmojiId(name: string): string {
    if (name === "Parent Directory") {
        return "parentDir"
    }

    if (name === "ThinkingInJava/") {
        return "thinking"
    }

    if (name === "javascript-101/") {
        return "html"
    }

    name = name.toLowerCase()

    if (name.endsWith("/")) {
        return "folder"
    }

    const parts = name.split(".")

    if (parts.length === 1) {
        return name
    }

    const extension = parts[parts.length - 1]

    return extension
}
