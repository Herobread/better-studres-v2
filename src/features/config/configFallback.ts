import { ConfigTypes } from "@src/types/configTypes"

/**
 * Configuration fallback settings.
 * @type {ConfigTypes}
 * @property {string} date - Date format setting.
 * @property {string} fileIcons - Type of icons for files.
 * @property {boolean} imagePreviewAsIcon - Show image preview as icon.
 * @property {boolean} imagePreviewOnHover - Show image preview on hover.
 * @property {boolean} showQuickLinks - Display quick links.
 * @property {boolean} showCommandButton - Display command button.
 */
export const CONFIG_FALLBACK: ConfigTypes = {
    date: "relative",
    fileIcons: "emoji",
    imagePreviewAsIcon: true,
    imagePreviewOnHover: true,
    showQuickLinks: true,
    showCommandButton: true,
}
