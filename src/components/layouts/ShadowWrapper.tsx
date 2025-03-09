import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"

import resetStyles from "@assets/styles/css-reset.css?inline"
import shadcnStyles from "@assets/styles/shadcn-ui.css?inline"

const ShadowWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const hostRef = useRef<HTMLDivElement>(null)
    const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null)
    const [innerContainer, setInnerContainer] = useState<HTMLDivElement | null>(
        null
    )

    useEffect(() => {
        if (hostRef.current && !hostRef.current.shadowRoot) {
            const shadow = hostRef.current.attachShadow({ mode: "open" })

            const style = document.createElement("style")
            style.textContent = [resetStyles, shadcnStyles].join("\n")

            const container = document.createElement("div")

            shadow.appendChild(style)
            shadow.appendChild(container)

            setShadowRoot(shadow)
            setInnerContainer(container)
        }
    }, [])

    return (
        <div ref={hostRef}>
            {innerContainer &&
                shadowRoot &&
                ReactDOM.createPortal(children, innerContainer)}
        </div>
    )
}

export default ShadowWrapper
