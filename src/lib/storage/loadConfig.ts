import { ConfigTypes } from "../../types/configTypes"
import { configFallback } from "./configFallback"

/**
 * Loads the configuration settings.
 * @returns {Promise<ConfigTypes>} A promise that resolves to the configuration settings.
 */
export const loadConfig = async (): Promise<ConfigTypes> => {
    const config = (await chrome.storage.sync.get("config")) as {
        config: ConfigTypes
    }

    return config.config || configFallback
}
