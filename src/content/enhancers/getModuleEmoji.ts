import { moduleEmojiMap } from "./moduleEmojiMap"

export function getModuleEmoji(moduleCode: string) {
    const FALLBACK_EMOJI = "🖥"

    moduleCode = moduleCode.replaceAll("/", "")

    return moduleEmojiMap[moduleCode] || FALLBACK_EMOJI
}
