import { EMOJI_MAP } from "./fileEmojiMap"
import { getFileEmojiId } from "./getFileEmojiId"
import { getSpecialDayEmoji } from "../special/getSpecialDayEmoji"

/**
 * Retrieves the emoji associated with a given filename.
 * @param {string} filename - The filename to get the emoji for.
 * @returns {string} The emoji associated with the filename, or a fallback emoji if not found.
 */
export function getFileEmoji(filename: string): string {
    const FALLBACK_EMOJI = "📄"

    // Check if today is a special day
    const specialEmoji = getSpecialDayEmoji()
    if (specialEmoji) {
        return specialEmoji
    }

    const emojiId = getFileEmojiId(filename)

    return EMOJI_MAP[emojiId] || FALLBACK_EMOJI
}
