import { ConfigTypes } from "../../types/configTypes"
import { configFallback } from "./configFallback"

export const loadConfig = async (): Promise<ConfigTypes> => {
    const config = (await chrome.storage.sync.get("config")) as {
        config: ConfigTypes
    }

    return config.config || configFallback
}
