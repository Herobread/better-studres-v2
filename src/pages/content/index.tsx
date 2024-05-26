import { createRoot } from "react-dom/client"
import Root from "./Root"
import { parsePageContent } from "@src/content/parsers/parser"
import Providers from "./Providers"
import CommandsRoot from "./CommandsRoot"
import { PageData } from "@src/types/pageContentTypes"

try {
    const url = location.href.toString()

    if (!url.endsWith("/")) {
        throw new Error("not a folder")
    }

    const rootContainer = document.body

    const parsedPageContent: PageData = parsePageContent(rootContainer)

    if (parsedPageContent.fileLinks.length === 0) {
        throw new Error("No file links found")
    }

    if (!rootContainer) {
        throw new Error("Can't find Options root element")
    }

    const root = createRoot(rootContainer)

    root.render(
        <Providers>
            <Root content={parsedPageContent} />
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
