import { getFileEmojiId } from "../utils/getFileEmojiId"
import { emojiMap } from "./emojiMap"

export function getFileEmoji(filename: string) {
    const FALLBACK_EMOJI = "📄"

    const emojiId = getFileEmojiId(filename)

    return emojiMap[emojiId] || FALLBACK_EMOJI
}
