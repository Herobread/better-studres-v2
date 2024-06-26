import { createRoot } from "react-dom/client"
import Root from "./Root"
import { PageData, parsePageContent } from "@src/features/parser"
import Providers from "./Providers"
import CommandsRoot from "./CommandsRoot"
import { THEME_STORAGE_KEY } from "@src/features/theme"
import {
    EXTENSION_STATE_STORAGE_KEY,
    getExtensionState,
} from "@src/features/extensionToggle/extensionState"
import {
    BLACK_LIST_STORAGE_KEY,
    checkIsUrlBlackListed,
} from "@src/features/extensionToggle/blacklist"

async function initialize() {
    const isUrlBlackListed = await checkIsUrlBlackListed(location.href)
    if (isUrlBlackListed) {
        return
    }

    const isExtensionEnabled = await getExtensionState()
    if (!isExtensionEnabled) {
        return
    }

    chrome.storage.local.onChanged.addListener((changes) => {
        if (changes[EXTENSION_STATE_STORAGE_KEY]) {
            location.reload()
        }

        if (changes[BLACK_LIST_STORAGE_KEY]) {
            const blackList = changes[BLACK_LIST_STORAGE_KEY].newValue

            if (blackList.includes(location.href)) {
                location.reload()
            }
        }
    })

    try {
        const rootContainer = document.body

        rootContainer.style.overflowY = "scroll" // show scroll bar

        const pageData: PageData = parsePageContent(rootContainer)

        if (pageData.type === "unknown") {
            throw new Error("unknown page type")
        }

        if (pageData.type === "root") {
            resetRootStyles()

            throw new Error("root page")
        }

        if (!rootContainer) {
            throw new Error("Can't find Options root element")
        }

        history.replaceState({ ...pageData }, "", location.href.toString())

        const root = createRoot(rootContainer)

        rootContainer.setAttribute("id", "__better_studres_theme_root")

        const themeObject = await chrome.storage.local.get(THEME_STORAGE_KEY)
        const theme = themeObject[THEME_STORAGE_KEY]

        resetFolderStyles()

        root.render(
            <Providers overrideTheme={theme}>
                <Root initialPageData={pageData} />
            </Providers>
        )
    } catch (e) {
        // load only commands then
        console.log("fallback")
        const div = document.createElement("div")
        div.className = "__better_studres__root _tailwind_preflight_reset"
        document.body.appendChild(div)

        const rootContainer = document.querySelector(".__better_studres__root")
        if (!rootContainer) {
            throw new Error("Can't find Options root element")
        }

        const root = createRoot(rootContainer)

        root.render(
            <Providers>
                <CommandsRoot />
            </Providers>
        )
    }
}

initialize()

function resetRootStyles() {
    const style = document.createElement("style")
    style.textContent = `
        html {
            font-size: 16px !important;
        }
    `
    document.head.appendChild(style)
}

function resetFolderStyles() {
    const style = document.createElement("style")
    style.textContent = `
        * {
        margin: 0;
        padding: 0;
    }
    `
    document.head.appendChild(style)
}
