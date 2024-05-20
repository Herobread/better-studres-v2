import { ConfigTypes } from "./ConfigTypes"

export const loadConfig = async (): Promise<ConfigTypes> => {
    const config = (await chrome.storage.sync.get("config")) as {
        config: ConfigTypes
    }

    console.log("loaded " + JSON.stringify(config))

    return config.config
}
