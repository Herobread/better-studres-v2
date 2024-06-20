import { createRoot } from "react-dom/client"
import Root from "./Root"
import { PageData, parsePageContent } from "@src/features/parser"
import Providers from "./Providers"
import CommandsRoot from "./CommandsRoot"
import { THEME_STORAGE_KEY } from "@src/features/theme"

async function initialize() {
    try {
        const rootContainer = document.body

        rootContainer.style.overflowY = "scroll" // show scroll bar

        const pageData: PageData = parsePageContent(rootContainer)
        history.replaceState({ ...pageData }, "", location.href.toString())

        if (pageData.type === "unknown") {
            throw new Error("unknown page type")
        }

        if (pageData.type === "root") {
            throw new Error("root page")
        }

        if (!rootContainer) {
            throw new Error("Can't find Options root element")
        }

        const root = createRoot(rootContainer)

        rootContainer.setAttribute("id", "__better_studres_theme_root")

        const themeObject = await chrome.storage.local.get(THEME_STORAGE_KEY)
        const theme = themeObject[THEME_STORAGE_KEY]

        root.render(
            <Providers overrideTheme={theme}>
                <Root initialPageData={pageData} />
            </Providers>
        )
    } catch (e) {
        // load only commands then
        console.log("fallback")
        console.log(e)
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
