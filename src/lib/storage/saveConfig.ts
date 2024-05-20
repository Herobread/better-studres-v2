import { ConfigTypes } from "./ConfigTypes"

export const saveConfig = async (config: ConfigTypes) => {
    await chrome.storage.sync.set({ config })
}
