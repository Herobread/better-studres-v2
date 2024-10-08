import pkg from "@src/../package.json"
import { ConfigContext } from "@src/features/config"
import {
    BASE_URL,
    MMS_BASE_URL,
    MOODLE_BASE_URL,
    MY_SAINT_BASE_URL,
} from "@src/features/files"
import {
    GET_QUICK_LINKS_QUERY_KEY,
    getQuickLinks,
} from "@src/features/quickLinks"
import {
    QuickLinkContainer,
    QuickLinkList,
} from "@src/features/quickLinks/components"
import { QuickLinkLink } from "@src/features/quickLinks/components/quickLink/QuickLinkLink"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"

export default function PopupFallback() {
    const { data: quickLinks } = useQuery({
        queryKey: [GET_QUICK_LINKS_QUERY_KEY],
        queryFn: getQuickLinks,
    })

    const { showQuickLinks } = useContext(ConfigContext)

    return (
        <body className="_tailwind_preflight_reset h-min space-y-4 bg-background p-2 text-base text-foreground">
            <div className="space-y-1">
                <h1 className="flex flex-grow items-baseline gap-1 text-xl font-bold">
                    Better studres
                    <span className="text-sm font-normal text-muted-foreground">
                        {pkg.version}
                    </span>
                </h1>
                <p className="text-sm text-muted-foreground">
                    Not on a Studres page. Navigate to{" "}
                    <a href={BASE_URL} target="_blank" rel="noreferrer">
                        Studres
                    </a>
                    .
                </p>
            </div>
            <div className="space-y-1">
                <p>Try one of those:</p>
                <QuickLinkContainer>
                    <QuickLinkLink
                        target="_blank"
                        rel="noreferrer"
                        quickLink={{
                            href: BASE_URL,
                            icon: "🌱",
                            id: 0,
                            name: "StudRes",
                        }}
                    />
                    <QuickLinkLink
                        target="_blank"
                        rel="noreferrer"
                        quickLink={{
                            href: MMS_BASE_URL,
                            icon: "✅",
                            id: 1,
                            name: "MMS",
                        }}
                    />
                    <QuickLinkLink
                        target="_blank"
                        rel="noreferrer"
                        quickLink={{
                            href: MY_SAINT_BASE_URL,
                            icon: "🏛️",
                            id: 2,
                            name: "MySaint",
                        }}
                    />
                    <QuickLinkLink
                        target="_blank"
                        rel="noreferrer"
                        quickLink={{
                            href: MOODLE_BASE_URL,
                            icon: "🎓",
                            id: 3,
                            name: "Moodle",
                        }}
                    />
                </QuickLinkContainer>
            </div>
            {showQuickLinks && quickLinks && quickLinks?.length > 0 && (
                <div className="space-y-1">
                    <p>Or your pinned links:</p>
                    <QuickLinkContainer>
                        <QuickLinkList linkConfig={{ target: "_blank" }} />
                    </QuickLinkContainer>
                </div>
            )}
        </body>
    )
}
