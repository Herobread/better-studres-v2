import { useEffect } from "react"
import useSmoothRouter from "./useSmoothRouter"

export function SmoothRouterListener() {
    const { navigateToPage } = useSmoothRouter()

    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            e.preventDefault()

            navigateToPage(window.location.toString(), e.state)
        }

        window.addEventListener("popstate", handlePopState)

        return () => {
            window.removeEventListener("popstate", handlePopState)
        }
    }, [navigateToPage])

    return null
}
