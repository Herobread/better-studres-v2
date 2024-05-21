import { ConfigTypes } from "../../types/configTypes"

export const saveConfig = async (config: ConfigTypes) => {
    await chrome.storage.sync.set({ config })
}
