console.log("background script loaded")

chrome.webNavigation.onCommitted.addListener(() => {
    console.log("committed")
})
