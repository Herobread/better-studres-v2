import splitFileName from "./splitFileName"

export function getFileEmojiId(fileName: string): string {
    // return name as it is
    const specialNames = [
        "Parent Directory",
        "ThinkingInJava/",
        "javascript-101/",
        "0-General/",
        "Coursework/",
        "Examples/",
        "Exercises/",
        "Lectures/",
        "Tutorials/",
    ]

    if (specialNames.includes(fileName)) {
        return fileName
    }

    fileName = fileName.toLowerCase()

    if (fileName.endsWith("/")) {
        return "folder"
    }

    const { extension, name } = splitFileName(fileName)

    if (!extension) {
        return name
    }

    return extension
}
