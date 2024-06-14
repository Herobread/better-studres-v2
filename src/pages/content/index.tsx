import { createRoot } from "react-dom/client"
import Root from "./Root"
import { parsePageContent } from "@src/content/parsers/parser"
import Providers from "./Providers"
import CommandsRoot from "./CommandsRoot"
import { PageData } from "@src/types/pageContentTypes"

try {
    const rootContainer = document.body

    rootContainer.style.overflowY = "scroll" // show scroll bar

    const parsedPageContent: PageData = parsePageContent(rootContainer)

    history.replaceState({ ...parsedPageContent }, "", location.href.toString())

    if (parsedPageContent.fileLinks.length === 0) {
        throw new Error("No file links found")
    }

    if (!rootContainer) {
        throw new Error("Can't find Options root element")
    }

    const root = createRoot(rootContainer)

    rootContainer.setAttribute("id", "__better_studres_folder_root")

    root.render(
        <Providers>
            <Root initialContent={parsedPageContent} />
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
