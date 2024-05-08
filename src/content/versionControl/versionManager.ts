// import {
//     FileLink,
//     TrackedFileLinkRecord,
//     TrackedFileLinkRecords,
// } from "@src/types/pageContentTypes"

// export async function addFile(href: string, fileLink: FileLink) {
//     const trackedFileLinks = {}

//     const key = generateFileLinkKey(href, fileLink)
//     const lastHistory: TrackedFileLinkRecord[] = []

//     // check history
//     const lastFileLink = lastHistory[0]

//     // add

//     const trackedLink: TrackedFileLinkRecords = {
//         current: fileLink,
//         history: lastHistory,
//         modified: fileLink.lastModifiedDate,
//     }

//     Object.assign({[key]: trackedLink}, trackedFileLinks)

//     await chrome.storage.local.set({
//         trackedLinks: ,
//     })
// }

// function generateFileLinkKey(href: string, fileLink: FileLink) {
//     return href + fileLink.name
// }

// export async function getFileLinkData(key: string) {
//     await chrome.storage.local.get("")
// }

// // export async function loadQuickLinks() {
// // const quickLinks: TrackedFileLink[] = await chrome.storage.local
// //     .get("trackedFileLink")
// //     .then((result) => {
// //         return result.quickLinks
// //     })

// // return quickLinks
// // }
