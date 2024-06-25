// use for reloading page from popup
export function reload() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0] && tabs[0].id !== undefined) {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url })
        } else {
            console.error("Active tab not found or tab ID is undefined")
        }
    })
}
