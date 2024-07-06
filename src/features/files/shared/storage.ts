import { FILE_DATA_STORAGE_KEY, FileDataMap, FilePropertyKey } from "./types"

/**
 * Retrieves all information about files from Chrome local storage.
 * @returns {Promise<Object>} A promise that resolves to an object containing file data.
 */
export async function getFileDataMap(): Promise<FileDataMap> {
    const fileDataObject = await chrome.storage.local.get(FILE_DATA_STORAGE_KEY)
    const fileData =
        (fileDataObject[FILE_DATA_STORAGE_KEY] as FileDataMap) || {}

    return fileData
}

export async function setFileDataMap(fileDataMap: FileDataMap) {
    await chrome.storage.local.set({ [FILE_DATA_STORAGE_KEY]: fileDataMap })
}

/**
 * Saves a property to a specified file in Chrome local storage.
 * @param {string} fileKey - The key representing the file.
 * @param {string} filePropertyKey - The key representing the specific property to save.
 * @param {any} fileProperty - The property to save.
 * @returns {Promise<void>} A promise that resolves when the data has been saved.
 */
export async function saveFileData(
    fileKey: string,
    filePropertyKey: FilePropertyKey,
    fileProperty: any
): Promise<void> {
    let fileData = await getFileDataMap()

    if (!fileData[fileKey]) {
        fileData[fileKey] = {}
    }

    fileData[fileKey][filePropertyKey] = fileProperty

    await chrome.storage.local.set({ [FILE_DATA_STORAGE_KEY]: fileData })
}

export const GET_FILE_DATA_QUERY_KEY = "getFileData"

/**
 * Retrieves a property for a specified file from Chrome local storage.
 * @param {string} fileKey - The key representing the file.
 * @param {string} [filePropertyKey] - The key representing the specific property to retrieve (optional).
 * @returns {Promise<any | null>} A promise that resolves to the requested property, or null if the file or property does not exist.
 */
export async function getFileData(
    fileKey: string,
    filePropertyKey?: FilePropertyKey
): Promise<any | null> {
    let fileData = await getFileDataMap()

    if (!fileData[fileKey]) {
        return null
    }

    if (filePropertyKey) {
        return fileData[fileKey][filePropertyKey]
    }

    return fileData[fileKey]
}
