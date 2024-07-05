import {
    getFileData,
    getFileDataMap,
    saveFileData,
    setFileDataMap,
} from "../shared/storage"

export interface Tag {
    id: number
    name: string
}

export const TAGS_QUERY_KEY = "tags"
export const TAGS_STORAGE_KEY = "tags"

export async function createTag(name: string) {
    const tags = await getTags()

    const isDuplicateTag = tags.find((someTag) => someTag.name === name)

    if (isDuplicateTag) {
        throw new Error("Tag already exists.")
    }

    const now = new Date()
    const id = now.getTime()

    const tag: Tag = { id, name }

    tags.push(tag)

    await chrome.storage.local.set({ [TAGS_STORAGE_KEY]: tags })

    return tag
}

export async function getTags() {
    const tagsObject = await chrome.storage.local.get(TAGS_STORAGE_KEY)
    const tags = tagsObject[TAGS_STORAGE_KEY] || []

    return tags as Tag[]
}

export async function setTags(tags: Tag[]) {
    await chrome.storage.local.set({ [TAGS_STORAGE_KEY]: tags })
}

export const TAGS_FILE_DATA_KEY = "tags"

export async function setFileTags(fileKey: string, tags: Tag[]) {
    await saveFileData(fileKey, TAGS_FILE_DATA_KEY, tags)
}

export async function compareTags(tag1: Tag, tag2: Tag, compareId?: boolean) {
    const isDataEqual = tag1.name === tag2.name

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

    await setFileTags(fileKey, filteredTags)
}

export async function toggleFileTag(fileKey: string, tag: Tag) {
    const tags = await getFileTags(fileKey)

    if (!tags) {
        await addTag(fileKey, tag)
        return
    }

    const isDupe = !!tags.find((tag_) => {
        return tag_.id === tag.id
    })

    if (isDupe) {
        await removeFileTag(fileKey, tag.id)
        return
    }

    await addTag(fileKey, tag)
}

export const GET_FILES_TAGGED_QUERY_KEY = "getFilesTagged"

export async function getFilesTagged(tagId: number) {
    const fileDataMap = await getFileDataMap()
    const filesKeysThatUseTag: string[] = []

    for (const fileKey in fileDataMap) {
        const fileTags = fileDataMap[fileKey][TAGS_FILE_DATA_KEY]

        if (!fileTags) {
            continue
        }

        const isTagFound = !!fileTags.find((tag) => {
            return tag.id === tagId
        })

        if (isTagFound) {
            filesKeysThatUseTag.push(fileKey)
        }
    }

    return filesKeysThatUseTag
}

export async function updateTagName(tagId: number, newTagName: string) {
    let tags = await getTags()

    const updateTagInArray = (tags: Tag[]) => {
        const tagIndex = tags.findIndex((tag) => {
            return tag.id === tagId
        })

        if (tagIndex === -1) {
            return tags
        }

        tags[tagIndex].name = newTagName

        return tags
    }

    tags = updateTagInArray(tags)

    const fileDataMap = await getFileDataMap()

    for (const fileKey in fileDataMap) {
        const tagsData = fileDataMap[fileKey][TAGS_FILE_DATA_KEY]

        if (!tagsData) {
            continue
        }

        fileDataMap[fileKey][TAGS_FILE_DATA_KEY] = updateTagInArray(tagsData)
    }

    await setFileDataMap(fileDataMap)
    await setTags(tags)
}

export async function deleteTag(tagId: number) {
    let tags = await getTags()

    const updateTagInArray = (tags: Tag[]) => {
        const tagIndex = tags.findIndex((tag) => {
            return tag.id === tagId
        })

        if (tagIndex === -1) {
            return tags
        }

        tags.splice(tagIndex, 1)

        return tags
    }

    tags = updateTagInArray(tags)

    const fileDataMap = await getFileDataMap()

    for (const fileKey in fileDataMap) {
        const tagsData = fileDataMap[fileKey][TAGS_FILE_DATA_KEY]

        if (!tagsData) {
            continue
        }

        fileDataMap[fileKey][TAGS_FILE_DATA_KEY] = updateTagInArray(tagsData)
    }

    await setFileDataMap(fileDataMap)
    await setTags(tags)
}
