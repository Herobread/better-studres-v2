import { AnchorHTMLAttributes, MouseEvent, forwardRef } from "react"
import useSmoothRouter from "./useSmoothRouter"
import {
    BASE_URL,
    checkIfStringMatchesStringPatterns,
} from "@src/content/versionControl"
import redirect from "@src/lib/redirect"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    isHard?: boolean
}

const escapedBaseUrl = BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const EXCLUDED_SMOOTH_NAVIGATION_HREF_PATTERNS = [
    // Exact match for BASE_URL
    new RegExp(`^${escapedBaseUrl}$`, "i"),
    // Match URLs with a dot in the final segment
    // unfortunately, doesn't work for files with no extension
    new RegExp(`^${escapedBaseUrl}.*\\.[^/]+$`, "i"),
]

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ ...props }, ref) => {
    const { href, isHard } = props

    const { navigateToPage } = useSmoothRouter()

    const handleNavigation = async (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        if (!href) {
            return
        }

        if (isHard) {
            redirect(href)
            return
        }

        const isExcluded = checkIfStringMatchesStringPatterns(
            href,
            EXCLUDED_SMOOTH_NAVIGATION_HREF_PATTERNS
        )
        if (isExcluded) {
            redirect(href, "userClick")
            return
        }

        navigateToPage(href)
    }

    return <a ref={ref} {...props} onClick={handleNavigation} />
})

Link.displayName = "Link"

export default Link
