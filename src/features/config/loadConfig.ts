import { ConfigTypes } from "../../types/configTypes"
import { CONFIG_FALLBACK } from "./configFallback"

/**
 * Loads the configuration settings.
 * @returns {Promise<ConfigTypes>} A promise that resolves to the configuration settings.
 */
export const loadConfig = async (): Promise<ConfigTypes> => {
    const config = (await chrome.storage.sync.get("config")) as {
        config: ConfigTypes
    }

    return config.config || CONFIG_FALLBACK
}
