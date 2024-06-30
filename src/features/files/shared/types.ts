import {
    TrackedFileLinkData,
    VERSION_CONTROL_FILE_DATA_KEY,
} from "../versionControl/storage"

export type FilePropertyKey = typeof VERSION_CONTROL_FILE_DATA_KEY

export const FILE_DATA_STORAGE_KEY: FilePropertyKey = "version-control-data"

export interface FileData {
    [FILE_DATA_STORAGE_KEY]?: TrackedFileLinkData
}

export interface FileDataMap {
    [key: string]: FileData
}
