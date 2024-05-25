import { ConfigTypes } from "../../types/configTypes"

/**
 * Saves the configuration settings.
 * @param {ConfigTypes} config - The configuration settings to save.
 * @returns {Promise<void>} A promise that resolves when the configuration has been saved.
 */
export const saveConfig = async (config: ConfigTypes): Promise<void> => {
    await chrome.storage.sync.set({ config })
}
