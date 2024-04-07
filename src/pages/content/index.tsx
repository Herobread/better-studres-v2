import { createRoot } from "react-dom/client"
import "./style.css"
import Root from "./Root"
import { parsePageContent } from "@src/content/parser"
const div = document.createElement("div")
div.id = "__root"
document.body.appendChild(div)

const rootContainer = document.body

const parsedPageContent = parsePageContent(rootContainer)
console.log(parsedPageContent)

if (!rootContainer) throw new Error("Can't find Options root element")
const root = createRoot(rootContainer)
root.render(<Root content={parsedPageContent} />)

try {
    console.log("content script loaded")
} catch (e) {
    console.error(e)
}
