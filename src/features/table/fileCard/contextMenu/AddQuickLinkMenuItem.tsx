import { ContextMenuItem } from "@src/components/ui/context-menu"
import {
    addQuickLink,
    generateQuickLinkInfo,
    GET_QUICK_LINKS_QUERY_KEY,
} from "@src/features/quickLinks"
import { useQueryClient } from "@tanstack/react-query"
import { PinIcon } from "lucide-react"

export function AddQuickLinkMenuItem({ href }: { href: string }) {
    const queryClient = useQueryClient()

    const onSelect = async () => {
        await addQuickLink(generateQuickLinkInfo(href))

        queryClient.invalidateQueries({ queryKey: [GET_QUICK_LINKS_QUERY_KEY] })
        queryClient.refetchQueries({ queryKey: [GET_QUICK_LINKS_QUERY_KEY] })
    }

    return (
        <ContextMenuItem onSelect={onSelect}>
            <PinIcon className="h-4 w-4" /> Pin link
        </ContextMenuItem>
    )
}
