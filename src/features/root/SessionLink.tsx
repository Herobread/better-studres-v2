import Link from "@src/features/router/Link"

interface SessionLinkProps {
    year: string
    href?: string
}

export function SessionLink({ year, href }: SessionLinkProps) {
    return (
        <Link className="flex gap-4" href={href}>
            <p>X years ago</p>
            <p>{year}</p>
        </Link>
    )
}
