export const FILE_DATA_STORAGE_KEY = "file-data"

export async function getFileDataMap() {
    const fileDataObject = await chrome.storage.local.get(FILE_DATA_STORAGE_KEY)
    const fileData = fileDataObject[FILE_DATA_STORAGE_KEY] || {}

    return fileData
}

export async function saveFileData(
    fileKey: string,
    dataKey: string,
    data: any
) {
    let fileData = await getFileDataMap()

    if (!fileData[fileKey]) {
        fileData[fileKey] = {}
    }

    fileData[fileKey][dataKey] = data

    console.log(fileData)

    await chrome.storage.local.set({ [FILE_DATA_STORAGE_KEY]: fileData })
}

export async function getFileData(fileUrl: string, key?: string) {
    let fileData = await getFileDataMap()

    if (!fileData[fileUrl]) {
        return null
    }

    if (key) {
        return fileData[fileUrl][key]
    }

    return fileData[fileUrl]
}
