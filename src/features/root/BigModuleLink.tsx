import { getModuleEmoji } from "../contentEnhancers/emoji/modules"
import Link from "../router/Link"

export function BigModuleLink({ href, name }: { href: string; name: string }) {
    const icon = getModuleEmoji(name)

    return (
        <Link
            href={href}
            className="group flex cursor-pointer items-center justify-center gap-2 rounded-md bg-background-layer-1 px-3 py-2 text-center outline-none ring-offset-background transition-all hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            <div>{icon}</div>
            <div className="font-mono">{name}</div>
        </Link>
    )
}
