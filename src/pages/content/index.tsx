import { createRoot } from "react-dom/client"
import Root from "./Root"
import { PageData, parsePageContent } from "@src/content/parsers/parser"
import Providers from "./Providers"
import CommandsRoot from "./CommandsRoot"

try {
    const rootContainer = document.body

    rootContainer.style.overflowY = "scroll" // show scroll bar

    const pageData: PageData = parsePageContent(rootContainer)
    history.replaceState({ ...pageData }, "", location.href.toString())

    if (pageData.type === "unknown") {
        throw new Error("unknown page type")
    }

    if (!rootContainer) {
        throw new Error("Can't find Options root element")
    }

    const root = createRoot(rootContainer)

    rootContainer.setAttribute("id", "__better_studres_theme_root")

    root.render(
        <Providers>
            <Root initialPageData={pageData} />
        </Providers>
    )
} catch (e) {
    // load only commands then
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
