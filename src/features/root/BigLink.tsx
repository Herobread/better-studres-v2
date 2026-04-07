import Link from "@src/features/router/Link"

interface BigLinkProps {
    children: string
    emoji?: string
    href?: string
}

export function BigLink({ children, emoji, href }: BigLinkProps) {
    return (
        <Link className="flex gap-4" href={href}>
            <p>{emoji}</p>
            <p>{children}</p>
        </Link>
    )
}
