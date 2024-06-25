export const ACTIVE_TAB_QUERY_KEY = "activeTab"

export async function getActiveTab() {
    const query: chrome.tabs.QueryInfo = {
        active: true,
        currentWindow: true,
    }

    const tabs = await chrome.tabs.query(query)

    const activeTab = tabs[0]

    return activeTab
}
