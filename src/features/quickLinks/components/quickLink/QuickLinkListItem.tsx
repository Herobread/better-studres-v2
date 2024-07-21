import { QuickLink } from "@src/features/quickLinks"
import Link, { LinkProps } from "../../../router/Link"
import { QuickLinkCardBase } from "./QuickLinkCardBase"

interface QuickLinkListItemProps extends LinkProps {
    quickLink: QuickLink
}

export function QuickLinkListItem({
    quickLink,
    ...props
}: QuickLinkListItemProps) {
    return (
        <Link href={quickLink.href} {...props}>
            <QuickLinkCardBase quickLink={quickLink} />
        </Link>
    )
}
