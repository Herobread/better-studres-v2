import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"

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
            const container = document.createElement("div")
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
