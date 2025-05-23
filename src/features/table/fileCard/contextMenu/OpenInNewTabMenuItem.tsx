import { ContextMenuItem } from "@src/components/ui/context-menu"
import { ExternalLinkIcon } from "lucide-react"

export function OpenInNewTabMenuItem({ href }: { href: string }) {
    const onSelect = () => {
        window.open(href, "_blank", "noopener,noreferrer")
    }

    return (
        <ContextMenuItem onSelect={onSelect}>
            <ExternalLinkIcon className="h-4 w-4"/> Open in new tab
        </ContextMenuItem>
    )
}
