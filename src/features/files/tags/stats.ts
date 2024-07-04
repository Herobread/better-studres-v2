import { getFileDataMap } from "../shared/storage"
import { TAGS_FILE_DATA_KEY } from "./storage"

export const GET_TOTAL_TAGGED_FILES_MAP_QUERY_KEY = "getTotalTaggedFilesMap"

export async function getTotalTaggedFilesMap() {
    const res: { [tagId: number]: number } = {}

    const fileData = await getFileDataMap()

    for (const fileKey in fileData) {
        const data = fileData[fileKey]

        const tagData = data[TAGS_FILE_DATA_KEY]

        if (!tagData) {
            continue
        }

        tagData.forEach((tag) => {
            const { id } = tag

            let count = res[id] || 0
            count += 1

            res[id] = count
        })
    }

    return res
}
