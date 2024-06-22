export const EXTENSION_STATE_STORAGE_KEY = "extension-state"

export async function setExtensionState(isOn: boolean) {
    await chrome.storage.local.set({
        [EXTENSION_STATE_STORAGE_KEY]: isOn,
    })
}

export async function getExtensionState() {
    const isOnObject = await chrome.storage.local.get(
        EXTENSION_STATE_STORAGE_KEY
    )

    const isOn = isOnObject[EXTENSION_STATE_STORAGE_KEY]

    return isOn
}
