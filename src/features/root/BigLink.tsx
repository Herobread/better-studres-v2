import {
    ContextMenu,
    ContextMenuTrigger,
} from "@src/components/ui/context-menu"
import Link from "@src/features/router/Link"
import { BasicContextMenu } from "./BasicContextMenu"

interface BigLinkProps {
    children: string
    emoji?: string
    href: string
}

export function BigLink({ children, emoji, href }: BigLinkProps) {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Link
                    className="group flex gap-2 bg-background-layer-1 p-4 hover:bg-accent"
                    href={href}
                >
                    <p>{emoji}</p>
                    <p className="group-hover:text-accent-foreground group-focus:text-accent-foreground">
                        {children}
                    </p>
                </Link>
            </ContextMenuTrigger>
            <BasicContextMenu href={href} name={children} />
        </ContextMenu>
    )
}
