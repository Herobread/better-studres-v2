import {
    BASE_URL,
    checkIfStringMatchesStringPatterns,
} from "@src/features/files"
import { redirect } from "@src/features/router/"
import {
    PageStateContext,
    TransitionData,
} from "@src/features/router/PageStateContext"
import { AnchorHTMLAttributes, MouseEvent, forwardRef, useContext } from "react"
import useSmoothRouter from "./useSmoothRouter"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** if true - it will completely refresh page, false - will try to fetch page in bg and update state */
    isHard?: boolean
    transitionData?: TransitionData
}

const escapedBaseUrl = BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const EXCLUDED_SMOOTH_NAVIGATION_HREF_PATTERNS = [
    // Exact match for BASE_URL
    // Match URLs with a dot in the final segment
    // unfortunately, doesn't work for files with no extension
    new RegExp(`^${escapedBaseUrl}.*\\.[^/]+$`, "i"),
]

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ ...props }, ref) => {
    const { href, isHard, target, onClick, transitionData } = props

    const { setTransitionData } = useContext(PageStateContext)
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
            redirect(href, "userClick", true)
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

        setTransitionData(transitionData)

        navigateToPage(href)
    }

    return <a ref={ref} {...props} onClick={handleNavigation} />
})

Link.displayName = "Link"

export default Link
