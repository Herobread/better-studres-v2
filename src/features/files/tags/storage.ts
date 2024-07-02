import { getFileData, saveFileData } from "../shared/storage"

export interface Tag {
    id: number
    icon: string
    name: string
}

export const TAGS_QUERY_KEY = "tags"
export const TAGS_STORAGE_KEY = "tags"

export async function createTag(icon: string, name: string) {
    const tags = await getTags()

    const isDuplicateTag = tags.find(
        (someTag) => someTag.icon === icon && someTag.name === name
    )

    if (isDuplicateTag) {
        throw new Error("Tag already exists.")
    }

    const now = new Date()
    const id = now.getTime()

    const tag: Tag = { id, icon, name }

    tags.push(tag)

    await chrome.storage.local.set({ [TAGS_STORAGE_KEY]: tags })

    return tag
}

export async function getTags() {
    const tagsObject = await chrome.storage.local.get(TAGS_STORAGE_KEY)
    const tags = tagsObject[TAGS_STORAGE_KEY] || []

    return tags as Tag[]
}

export const TAGS_FILE_DATA_KEY = "tags"

export async function addTag(fileKey: string, tag: Tag) {
    await saveFileData(fileKey, TAGS_FILE_DATA_KEY, [tag])
}

export async function getFileTags(fileKey: string) {
    return (await getFileData(fileKey, TAGS_FILE_DATA_KEY)) as Tag[]
}
