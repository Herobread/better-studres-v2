import {
    ContextMenu,
    ContextMenuTrigger,
} from "@src/components/ui/context-menu"
import { QuickLinkCardBase } from "@src/features/quickLinks/components/quickLink/QuickLinkCardBase"
import { QuickLinkContextMenuContent } from "@src/features/quickLinks/components/quickLink/QuickLinkContextMenuContent"
import {
    GET_QUICK_LINKS_QUERY_KEY,
    getQuickLinks,
} from "@src/features/quickLinks/storage"
import Link from "@src/features/router/Link"
import { useQuery } from "@tanstack/react-query"

export function QuickLinkList() {
    const { data: quickLinks } = useQuery({
        queryKey: [GET_QUICK_LINKS_QUERY_KEY],
        queryFn: getQuickLinks,
    })

    return (
        <>
            {quickLinks?.map((quickLink, i) => {
                const isFirst = i === 0
                const isLast = i === quickLinks.length - 1

                return (
                    <ContextMenu key={quickLink.id}>
                        <ContextMenuTrigger>
                            <Link href={quickLink.href}>
                                <QuickLinkCardBase quickLink={quickLink} />
                            </Link>
                        </ContextMenuTrigger>
                        <QuickLinkContextMenuContent
                            quickLink={quickLink}
                            isFirst={isFirst}
                            isLast={isLast}
                        />
                    </ContextMenu>
                )
            })}
        </>
    )
}
