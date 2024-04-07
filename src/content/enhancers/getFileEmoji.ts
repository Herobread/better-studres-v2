import { getFileExtension } from "../utils/getFileExtension"
import { emojiMap } from "./emojiMap"

export function getFileEmoji(filename: string) {
    const fileExtension = getFileExtension(filename)
    return emojiMap[fileExtension] || "📄"
}
