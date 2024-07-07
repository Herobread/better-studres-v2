import {
    BASE_URL,
    checkIfStringMatchesStringPatterns,
} from "@src/features/files"
import { redirect } from "@src/features/router/"
import { AnchorHTMLAttributes, MouseEvent, forwardRef } from "react"
import useSmoothRouter from "./useSmoothRouter"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
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
    const { href, isHard, target, onClick } = props

    const { navigateToPage } = useSmoothRouter()

    const handleNavigation = async (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        if (onClick) {
            onClick(e)
        }

        if (!href) {
            return
        }

        if (isHard || (target && target === "_blank")) {
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

    console.log("FileCardDetails ref:", ref)

    return <a ref={ref} {...props} onClick={handleNavigation} />
})

Link.displayName = "Link"

export default Link
