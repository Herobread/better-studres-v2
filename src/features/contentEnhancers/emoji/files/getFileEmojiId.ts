import { splitFileName } from "@src/features/parser"

export function getFileEmojiId(fileName: string): string {
    // return name as it is
    const specialNames = [
        "Parent Directory",
        "ThinkingInJava/",
        "javascript-101/",
        "0-General/",
        "Coursework/",
        "Assessment/",
        "Practicals/",
        "Examples/",
        "Exercises/",
        "Lectures/",
        "Tutorials/",
        "First/",
        "Hons/",
        "MSci/",
        "Masters/",
        "Second/",
        "Orientation/",
        "Reviews/",
        "Makefile",
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
