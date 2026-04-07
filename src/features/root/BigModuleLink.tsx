import {
    ContextMenu,
    ContextMenuTrigger,
} from "@src/components/ui/context-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@src/components/ui/tooltip"
import { modules } from "@src/constants/modules"
import { getModuleEmoji } from "../contentEnhancers/emoji/modules"
import Link from "../router/Link"
import { BasicContextMenu } from "./BasicContextMenu"

export function BigModuleLink({
    href,
    moduleCode: code,
}: {
    href: string
    moduleCode: string
}) {
    const icon = getModuleEmoji(code)

    return (
        <ContextMenu>
            <Tooltip disableHoverableContent>
                <TooltipTrigger asChild>
                    <ContextMenuTrigger asChild>
                        <Link
                            href={href}
                            className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-background-layer-1 px-3 py-2 text-center outline-none ring-offset-background transition-all hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <div>{icon}</div>
                            <div className="font-mono">{code}</div>
                        </Link>
                    </ContextMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    {modules.find((mod) => mod.code === code)?.name || code}
                </TooltipContent>
            </Tooltip>
            <BasicContextMenu href={href} name={code} />
        </ContextMenu>
    )
}
