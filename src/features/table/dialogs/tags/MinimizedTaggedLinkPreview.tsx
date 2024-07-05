import { MinimizedFileLink } from "../../../files"
import Link, { LinkProps } from "../../../router/Link"

interface MinimizedTaggedLinkPreviewProps extends LinkProps {
    minimizedFileLink: MinimizedFileLink
}

export function MinimizedTaggedLinkPreview({
    minimizedFileLink,
    ...props
}: MinimizedTaggedLinkPreviewProps) {
    const { href, name } = minimizedFileLink

    return (
        <Link
            href={href}
            className="w-full rounded-lg p-2 hover:bg-background-layer-1"
            {...props}
        >
            <p className="font-bold">{name}</p>
            <p className="text-sm text-muted-foreground">{href}</p>
        </Link>
    )
}
