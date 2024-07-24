import {
    GET_QUICK_LINKS_QUERY_KEY,
    getQuickLinks,
} from "@src/features/quickLinks/storage"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeftIcon } from "lucide-react"

export function EmptyQuickLinksMessage() {
    const { data: quickLinks } = useQuery({
        queryKey: [GET_QUICK_LINKS_QUERY_KEY],
        queryFn: getQuickLinks,
    })

    if (quickLinks && quickLinks.length !== 0) {
        return null
    }

    return (
        <p className="flex items-center gap-1 text-muted-foreground">
            <ArrowLeftIcon className="h-4 w-4" />
            <span>
                Pin links here or hide this panel in the popup settings.
            </span>
        </p>
    )
}
