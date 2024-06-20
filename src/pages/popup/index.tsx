import { createRoot } from "react-dom/client"
import "@pages/popup/index.css"
import Popup from "@pages/popup/Popup"
import Providers from "../content/Providers"
import { THEME_STORAGE_KEY } from "@src/contexts/ThemeContext"

async function init() {
    const rootContainer = document.querySelector("#__root")

    if (!rootContainer) throw new Error("Can't find Popup root element")

    const root = createRoot(rootContainer)

    const themeObject = await chrome.storage.local.get(THEME_STORAGE_KEY)
    const theme = themeObject[THEME_STORAGE_KEY]

    root.render(
        <Providers overrideTheme={theme}>
            <Popup />
        </Providers>
    )
}

init()
