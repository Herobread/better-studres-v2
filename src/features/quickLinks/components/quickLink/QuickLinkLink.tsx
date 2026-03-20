import { QuickLinkCardBase } from "@src/features/quickLinks/components/quickLink/QuickLinkCardBase"
import { QuickLink } from "@src/features/quickLinks/storage"
import Link, { LinkProps } from "@src/features/router/Link"

export function QuickLinkLink({
    quickLink,
    ...props
}: { quickLink: QuickLink } & LinkProps) {
    const { href } = quickLink

    return (
        <Link
            href={href}
            {...props}
            className="block rounded-xl outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            <QuickLinkCardBase icon={quickLink.icon} name={quickLink.name} />
        </Link>
    )
}
