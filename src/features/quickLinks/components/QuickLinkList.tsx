import {
    ContextMenu,
    ContextMenuTrigger,
} from "@src/components/ui/context-menu"
import { QuickLinkContextMenuContent } from "@src/features/quickLinks/components/quickLink/QuickLinkContextMenuContent"
import { QuickLinkLink } from "@src/features/quickLinks/components/quickLink/QuickLinkLink"
import {
    GET_QUICK_LINKS_QUERY_KEY,
    getQuickLinks,
} from "@src/features/quickLinks/storage"
import Link from "@src/features/router/Link"
import { useQuery } from "@tanstack/react-query"
import { ComponentProps } from "react"

export function QuickLinkList({
    linkConfig,
}: {
    linkConfig?: ComponentProps<typeof Link>
}) {
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
                            <QuickLinkLink
                                quickLink={quickLink}
                                {...linkConfig}
                            />
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
