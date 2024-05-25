import { moduleEmojiMap } from "./moduleEmojiMap"

/**
 * Retrieves the emoji associated with a given module code.
 * @param {string} moduleCode - The module code to get the emoji for.
 * @returns {string} The emoji associated with the module code, or a fallback emoji if not found.
 */
export function getModuleEmoji(moduleCode: string): string {
    const FALLBACK_EMOJI = "🖥"

    if (!moduleCode) {
        return FALLBACK_EMOJI
    }

    moduleCode = moduleCode.replaceAll("/", "")

    return moduleEmojiMap[moduleCode] || FALLBACK_EMOJI
}
