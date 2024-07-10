import {
    BLACK_LIST_STORAGE_KEY,
    checkIsUrlBlackListed,
} from "@src/features/extensionToggle/blacklist"
import {
    EXTENSION_STATE_STORAGE_KEY,
    getExtensionState,
} from "@src/features/extensionToggle/extensionState"
import { PageData, parsePageContent } from "@src/features/parser"
import { THEME_STORAGE_KEY } from "@src/features/theme"
import { EnhanceHtml } from "@src/pages/content/pages/EnhanceHtml"
import { createRoot } from "react-dom/client"
import CommandsRoot from "./CommandsRoot"
import Providers from "./Providers"
import Root from "./Root"

async function initialize() {
    const currentUrl = location.href

    const isUrlBlackListed = await checkIsUrlBlackListed(currentUrl)
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

            if (blackList.includes(currentUrl)) {
                location.reload()
            }
        }
    })

    try {
        const rootContainer = document.body

        const themeObject = await chrome.storage.local.get(THEME_STORAGE_KEY)
        const theme = themeObject[THEME_STORAGE_KEY]

        if (currentUrl.endsWith(".html")) {
            const enhancerRoot = document.createElement("div")
            enhancerRoot.setAttribute("id", "__better_studres_theme_root")
            rootContainer.appendChild(enhancerRoot)
            const root = createRoot(enhancerRoot)
            root.render(
                <Providers overrideTheme={theme}>
                    <EnhanceHtml />
                    <CommandsRoot />
                </Providers>
            )
            return
        }

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

        history.replaceState({ ...pageData }, "", currentUrl.toString())

        const root = createRoot(rootContainer)

        rootContainer.setAttribute("id", "__better_studres_theme_root")

        resetFolderStyles()

        rootContainer.style.overflowY = "scroll" // show scroll bar

        root.render(
            <Providers overrideTheme={theme}>
                <Root initialPageData={pageData} />
            </Providers>
        )
    } catch (e) {
        // load only commands then
        const div = document.createElement("div")
        div.className = "__better_studres__root _tailwind_preflight_reset"
        document.body.appendChild(div)

        const themeObject = await chrome.storage.local.get(THEME_STORAGE_KEY)
        const theme = themeObject[THEME_STORAGE_KEY]

        const rootContainer = document.querySelector(".__better_studres__root")
        if (!rootContainer) {
            throw new Error("Can't find Options root element")
        }

        const root = createRoot(rootContainer)

        root.render(
            <Providers overrideTheme={theme}>
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
