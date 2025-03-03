import { MODULE_EMOJI_MAP } from "./moduleEmojiMap"

/**
 * Retrieves the emoji associated with a given module code.
 * @param {string} moduleCode - The module code to get the emoji for.
 * @returns {string} The emoji associated with the module code, or a fallback emoji if not found.
 */
export function getModuleEmoji(moduleCode: string): string {
    const FALLBACK_EMOJI = "🖥"

    if (isSpecialDay()) {
        return "🧀"
    }

    if (!moduleCode) {
        return FALLBACK_EMOJI
    }

    moduleCode = moduleCode.replaceAll("/", "")

    return MODULE_EMOJI_MAP[moduleCode] || FALLBACK_EMOJI
}

/**
 * Checks if today is April 1st (Cheese Day).
 * @returns {boolean} True if today is April 1st, false otherwise.
 */
function isSpecialDay() {
    const now = new Date()
    const month = now.getMonth() // 0-11 (Jan-Dec)
    const day = now.getDate()

    return month === 3 && day === 1 // April 1st
}
