import { QuickLink } from "@src/types/quickLinkTypes"
import Link, { LinkProps } from "../router/Link"
import { QuickLinkCardBase } from "./QuickLinkCardBase"

interface QuickLinkCardProps extends LinkProps {
    quickLink: QuickLink
}

export function QuickLinkCard({ quickLink, ...props }: QuickLinkCardProps) {
    return (
        <Link href={quickLink.href} {...props}>
            <QuickLinkCardBase quickLink={quickLink} />
        </Link>
    )
}
