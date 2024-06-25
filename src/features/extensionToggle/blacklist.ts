export const BLACK_LIST_STORAGE_KEY = "black-list"
export const IS_URL_BLACK_LISTED_QUERY_KEY = "isUrlBlackListed"

export async function checkIsUrlBlackListed(url: string) {
    const blackList = await getBlackList()

    if (!blackList) {
        return false
    }

    return blackList.includes(url)
}

export async function setBlackList(list: string[]) {
    await chrome.storage.local.set({
        [BLACK_LIST_STORAGE_KEY]: list,
    })
}

export async function getBlackList() {
    const blackListObj = await chrome.storage.local.get(BLACK_LIST_STORAGE_KEY)
    return blackListObj[BLACK_LIST_STORAGE_KEY] as string[] | undefined
}

export async function toggleBlackListForUrl(url: string) {
    const blackList = await getBlackList()

    const isBlackListDefined = !blackList
    if (isBlackListDefined) {
        setBlackList([url])
        return
    }

    const isUrlBlackListed = blackList.includes(url)
    if (isUrlBlackListed) {
        const index = blackList.indexOf(url)
        blackList.splice(index, 1)

        setBlackList(blackList)

        return
    }

    blackList.push(url)
    setBlackList(blackList)
}
