import { createRoot } from "react-dom/client"
import "./style.css"
import Root from "./Root"
import { parsePageContent } from "@src/content/parser"
import CommandsRoot from "./CommandsRoot"

try {
    const rootContainer = document.body

    const parsedPageContent = parsePageContent(rootContainer)

    if (!rootContainer) throw new Error("Can't find Options root element")
    const root = createRoot(rootContainer)

    root.render(<Root content={parsedPageContent} />)

    console.log("Root loaded")
} catch (e) {
    // load only commands then
    const div = document.createElement('div');
    div.className = '__better_studres__root _tailwind_preflight_reset';
    document.body.appendChild(div);

    const rootContainer = document.querySelector('.__better_studres__root');
    if (!rootContainer) throw new Error("Can't find Options root element");

    const root = createRoot(rootContainer);

    root.render(<CommandsRoot />)

    console.log("Commands root loaded")
}
