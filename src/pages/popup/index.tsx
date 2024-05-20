import React from "react"
import { createRoot } from "react-dom/client"
import "@pages/popup/index.css"
// import "./"
import Popup from "@pages/popup/Popup"
import Providers from "../content/Providers"

function init() {
    const rootContainer = document.querySelector("#__root")

    if (!rootContainer) throw new Error("Can't find Popup root element")

    const root = createRoot(rootContainer)

    root.render(
        <Providers>
            <Popup />
        </Providers>
    )
}

init()
