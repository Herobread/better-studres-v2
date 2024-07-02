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

export async function setTags(fileKey: string, tags: Tag[]) {
    await saveFileData(fileKey, TAGS_FILE_DATA_KEY, tags)
}

export async function compareTags(tag1: Tag, tag2: Tag, compareId?: boolean) {
    const isDataEqual = tag1.icon === tag2.icon && tag1.name === tag2.name

    return compareId ? isDataEqual && tag1.id === tag2.id : isDataEqual
}

export async function addTag(fileKey: string, tag: Tag) {
    const tags = await getFileTags(fileKey)

    if (!tags) {
        await saveFileData(fileKey, TAGS_FILE_DATA_KEY, [tag])
        return
    }

    tags?.push(tag)

    await saveFileData(fileKey, TAGS_FILE_DATA_KEY, tags)
}

export async function getFileTags(fileKey: string) {
    return (await getFileData(fileKey, TAGS_FILE_DATA_KEY)) as Tag[] | undefined
}

export async function removeFileTag(fileKey: string, tagId: number) {
    const tags = await getFileTags(fileKey)

    if (!tags) {
        return
    }

    const filteredTags = tags.filter((tag) => {
        return tag.id !== tagId
    })

    await setTags(fileKey, filteredTags)
}

export async function toggleFileTag(fileKey: string, tag: Tag) {
    const tags = await getFileTags(fileKey)

    console.log(tags)

    if (!tags) {
        await addTag(fileKey, tag)
        return
    }

    const isDupe = !!tags.find((tag_) => {
        return tag_.id === tag.id
    })

    if (isDupe) {
        await removeFileTag(fileKey, tag.id)
    }

    await addTag(fileKey, tag)
}
