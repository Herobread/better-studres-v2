import { TAGS_FILE_DATA_KEY, Tag } from "../tags/storage"
import {
    TrackedFileLinkData,
    VERSION_CONTROL_FILE_DATA_KEY,
} from "../versionControl/storage"

export type FilePropertyKey =
    | typeof VERSION_CONTROL_FILE_DATA_KEY
    | typeof TAGS_FILE_DATA_KEY

export const FILE_DATA_STORAGE_KEY: FilePropertyKey = "version-control-data"

export interface FileData {
    [VERSION_CONTROL_FILE_DATA_KEY]?: TrackedFileLinkData
    [TAGS_FILE_DATA_KEY]?: Tag[]
}

export interface FileDataMap {
    [key: string]: FileData
}
