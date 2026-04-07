import {
    ContextMenu,
    ContextMenuTrigger,
} from "@src/components/ui/context-menu"
import { getModuleEmoji } from "../contentEnhancers/emoji/modules"
import Link from "../router/Link"
import { BasicContextMenu } from "./BasicContextMenu"

export function BigModuleLink({ href, name }: { href: string; name: string }) {
    const icon = getModuleEmoji(name)

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Link
                    href={href}
                    className="group flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-background-layer-1 px-3 py-2 text-center outline-none ring-offset-background transition-all hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <div>{icon}</div>
                    <div className="font-mono">{name}</div>
                </Link>
            </ContextMenuTrigger>
            <BasicContextMenu href={href} name={name} />
        </ContextMenu>
    )
}
