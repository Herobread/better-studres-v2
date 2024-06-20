import { QuickLink } from "@src/types/quickLinkTypes"
import Link from "../../features/router/Link"

interface QuickLinkCardProps {
    quickLink: QuickLink
}

export default function QuickLinkCard({ quickLink }: QuickLinkCardProps) {
    const { href, name, icon } = quickLink

    return (
        <Link
            href={href}
            className="flex cursor-pointer gap-2 rounded-xl bg-background-layer-1 px-3 py-1 hover:bg-accent"
        >
            <div className="text-base">{icon}</div>
            <div>{name}</div>
        </Link>
    )
}
