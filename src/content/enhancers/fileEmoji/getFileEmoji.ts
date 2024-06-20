import { getFileEmojiId } from "./getFileEmojiId"
import { EMOJI_MAP } from "./fileEmojiMap"

/**
 * Retrieves the emoji associated with a given filename.
 * @param {string} filename - The filename to get the emoji for.
 * @returns {string} The emoji associated with the filename, or a fallback emoji if not found.
 */
export function getFileEmoji(filename: string): string {
    const FALLBACK_EMOJI = "📄"

    const emojiId = getFileEmojiId(filename)

    return EMOJI_MAP[emojiId] || FALLBACK_EMOJI
}
