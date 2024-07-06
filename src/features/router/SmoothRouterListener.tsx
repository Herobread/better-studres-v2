import { useEffect, useRef } from "react"
import { PageData } from "../parser"
import { redirect } from "./redirect"
import useSmoothRouter from "./useSmoothRouter"

export function SmoothRouterListener() {
    const { navigateToPage } = useSmoothRouter()
    const lastStateRef = useRef<PageData>(history.state)

    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            e.preventDefault()

            const lastState = lastStateRef.current

            if (lastState.type === "unknown") {
                redirect(window.location.toString())
            }

            lastStateRef.current = history.state

            navigateToPage(window.location.toString(), e.state)
        }

        window.addEventListener("popstate", handlePopState)

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("popstate", handlePopState)
        }
    }, [navigateToPage])

    return null
}
