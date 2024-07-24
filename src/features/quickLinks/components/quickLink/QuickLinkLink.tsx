import { QuickLinkCardBase } from "@src/features/quickLinks/components/quickLink/QuickLinkCardBase"
import { QuickLink } from "@src/features/quickLinks/storage"
import Link, { LinkProps } from "@src/features/router/Link"

export function QuickLinkLink({
    quickLink,
    ...props
}: { quickLink: QuickLink } & LinkProps) {
    const { href } = quickLink

    return (
        <Link href={href} {...props}>
            <QuickLinkCardBase icon={quickLink.icon} name={quickLink.name} />
        </Link>
    )
}
