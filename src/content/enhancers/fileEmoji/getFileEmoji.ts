import { getFileEmojiId } from "./getFileEmojiId"
import { emojiMap } from "./fileEmojiMap"

export function getFileEmoji(filename: string) {
    const FALLBACK_EMOJI = "📄"

    const emojiId = getFileEmojiId(filename)

    return emojiMap[emojiId] || FALLBACK_EMOJI
}
