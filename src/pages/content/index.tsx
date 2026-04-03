import {
    BLACK_LIST_STORAGE_KEY,
    checkIsUrlBlackListed,
} from "@src/features/extensionToggle/blacklist"
import {
    EXTENSION_STATE_STORAGE_KEY,
    getExtensionState,
} from "@src/features/extensionToggle/extensionState"
import { PageData, parsePageContent } from "@src/features/parser"
import {
    FONT_STORAGE_KEY,
    FontFamily,
    THEME_STORAGE_KEY,
} from "@src/features/theme"
import { EnhanceHtml } from "@src/pages/content/pages/EnhanceHtml"
import { createRoot } from "react-dom/client"
import Providers from "./Providers"
import Root from "./Root"

import { createHighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

import c from "shiki/langs/c.mjs"
import cpp from "shiki/langs/cpp-macro.mjs"
import css from "shiki/langs/css.mjs"
import haskell from "shiki/langs/haskell.mjs"
import java from "shiki/langs/java.mjs"
import javascript from "shiki/langs/javascript.mjs"
import perl from "shiki/langs/perl.mjs"
import python from "shiki/langs/python.mjs"
import r from "shiki/langs/r.mjs"
import rust from "shiki/langs/rust.mjs"
import shellscript from "shiki/langs/shellscript.mjs"
import typescript from "shiki/langs/typescript.mjs"

import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import ghdark from "shiki/themes/github-dark.mjs"

export const highlighter = await createHighlighterCore({
    themes: [ghdark],
    langs: [
        java,
        css,
        shellscript,
        javascript,
        typescript,
        python,
        perl,
        haskell,
        c,
        cpp,
        r,
        rust,
    ],
    engine: createJavaScriptRegexEngine(),
})

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

    const fontObject = await chrome.storage.local.get(FONT_STORAGE_KEY)
    const font = fontObject[FONT_STORAGE_KEY] as FontFamily

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

        addHeadMeta()
        addHtmlLang()

        const themeObject = await chrome.storage.local.get(THEME_STORAGE_KEY)
        const theme = themeObject[THEME_STORAGE_KEY]

        if (currentUrl.endsWith(".html") || currentUrl.endsWith(".htm")) {
            const enhancerRoot = document.createElement("div")
            enhancerRoot.setAttribute("id", "__better_studres_theme_root")
            rootContainer.appendChild(enhancerRoot)
            const root = createRoot(enhancerRoot)
            root.render(
                <Providers overrideTheme={theme} overrideFont={font}>
                    <EnhanceHtml />
                    <CommandsShortcutMount />
                </Providers>
            )
            return
        }

        const pageData: PageData = parsePageContent(rootContainer)

        if (pageData.type === "unknown") {
            throw new Error("unknown page type")
        }

        if (pageData.type === "root") {
            resetStyles()
        }

        if (!rootContainer) {
            throw new Error("Can't find Options root element")
        }

        history.replaceState({ ...pageData }, "", currentUrl.toString())

        const styleElements = document.querySelectorAll(
            'style, link[rel="stylesheet"]'
        )
        styleElements.forEach((el) => el.remove()) // remove initial style

        const root = createRoot(rootContainer)
        rootContainer.setAttribute("id", "__better_studres_theme_root")

        resetStyles()

        rootContainer.style.overflowY = "scroll" // show scroll bar

        root.render(
            <Providers overrideTheme={theme} overrideFont={font}>
                <Root initialPageData={pageData} />
            </Providers>
        )
    } catch (e) {
        // load only commands then
        console.log(e)
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
            <Providers overrideTheme={theme} overrideFont={font}>
                <CommandsShortcutMount />
            </Providers>
        )
    }
}

initialize()

function resetStyles() {
    const style = document.createElement("style")
    style.textContent = `
        * {
        margin: 0;
        padding: 0;
    }
    `
    document.head.appendChild(style)
}

function addHeadMeta() {
    const link = document.createElement("link")
    link.rel = "preconnect"
    link.href = "https://fonts.googleapis.com"
    document.head.appendChild(link)

    const link2 = document.createElement("link")
    link2.rel = "preconnect"
    link2.href = "https://fonts.gstatic.com"
    link2.crossOrigin = "anonymous"
    document.head.appendChild(link2)

    const link3 = document.createElement("link")
    link3.rel = "stylesheet"
    link3.href =
        "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap"
    document.head.appendChild(link3)

    const meta = document.createElement("meta")
    meta.name = "viewport"
    meta.content = "width=device-width, initial-scale=1"

    document.head.appendChild(meta)
}

function addHtmlLang() {
    document.documentElement.lang = "en"
}
