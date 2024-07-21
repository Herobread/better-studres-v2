import { QuickLinkCardBase } from "@src/features/quickLinks/components/quickLink/QuickLinkCardBase"
import { QuickLink } from "@src/features/quickLinks/storage"
import Link, { LinkProps } from "@src/features/router/Link"

export function QuickLinkLink({
    quickLink,
    ...props
}: { quickLink: QuickLink } & LinkProps) {
    return (
        <Link {...props}>
            <QuickLinkCardBase quickLink={quickLink} />
        </Link>
    )
}
