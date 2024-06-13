import { AnchorHTMLAttributes, MouseEvent, forwardRef } from "react"
import useSmoothRouter from "./useSmoothRouter"
import { BASE_URL, checkIfStringMatchesStringPatterns } from "@src/content/versionControl"
import redirect from "@src/lib/redirect"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const escapedBaseUrl = BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const EXCLUDED_SMOOTH_NAVIGATION_HREF_PATTERNS = [
    new RegExp(`^${escapedBaseUrl}$`, 'i'), // Exact match for BASE_URL
    new RegExp(`^${escapedBaseUrl}.*\\.[^/]+$`, 'i') // Match URLs with a dot in the final segment
];

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ ...props }, ref) => {
    const { href } = props

    const { navigateToPage } = useSmoothRouter()

    const handleNavigation = async (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        if (!href) {
            return
        }

        const isExcluded = checkIfStringMatchesStringPatterns(href, EXCLUDED_SMOOTH_NAVIGATION_HREF_PATTERNS)
        if (isExcluded) {
            console.log('excluded: ' + href)
            redirect(href, 'userClick')
            return
        }

        navigateToPage(href)
    }

    return <a ref={ref} {...props} onClick={handleNavigation} />
})

Link.displayName = "Link"

export default Link
