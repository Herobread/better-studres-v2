import { MODULE_EMOJI_MAP } from "./moduleEmojiMap"

/**
 * Retrieves the emoji associated with a given module code.
 * @param {string} moduleCode - The module code to get the emoji for.
 * @returns {string} The emoji associated with the module code, or a fallback emoji if not found.
 */
export function getModuleEmoji(moduleCode: string): string {
    const FALLBACK_EMOJI = "🖥"

    const specialEmoji = getSpecialDayEmoji()
    if (specialEmoji) {
        return specialEmoji
    }

    if (!moduleCode) {
        return FALLBACK_EMOJI
    }

    moduleCode = moduleCode.replaceAll("/", "")

    return MODULE_EMOJI_MAP[moduleCode] || FALLBACK_EMOJI
}

/**
 * Checks if today is a special day and returns the corresponding emoji.
 * @returns {string | null} The special day emoji, or null if today is not a special day.
 */
export function getSpecialDayEmoji(): string | null {
    const now = new Date()
    const month = now.getMonth() // 0-11 (Jan-Dec)
    const day = now.getDate()

    // Special days map: [month, day] -> emoji
    const specialDays: Record<string, string> = {
        // April Fools' Day
        "3,1": "🧀",
        // Christmas
        "11,25": "🎄",
        // Halloween
        "9,31": "🎃",
        // Valentine's Day
        "1,14": "❤️",
        // St. Patrick's Day
        "2,17": "☘️",
        // New Year's Day
        "0,1": "🎆",
        // Thanksgiving (4th Thursday of November - simplified to Nov 24-30)
        "10,24": "🦃",
        "10,25": "🦃",
        "10,26": "🦃",
        "10,27": "🦃",
        "10,28": "🦃",
        "10,29": "🦃",
        "10,30": "🦃",
    }

    const key = `${month},${day}`
    return specialDays[key] || null
}
