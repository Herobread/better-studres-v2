import pkg from "@src/../package.json"
import CompactLayout from "@src/components/layouts/CompactLayout"
import {
    QuickLinkCardBase,
    QuickLinkContainer,
    getQuickLinks,
} from "@src/features/quickAccess"
import { BASE_URL, MMS_BASE_URL, MY_SAINT_BASE_URL } from "@src/features/files"
import { useQuery } from "@tanstack/react-query"

export default function PopupFallback() {
    const { data: quickLinks } = useQuery({
        queryKey: ["quicklinks"],
        queryFn: getQuickLinks,
    })

    return (
        <body className="_tailwind_preflight_reset grid h-min gap-4 bg-background p-2 text-base text-foreground">
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
            <CompactLayout>
                <p>Try one of those:</p>
                <QuickLinkContainer>
                    <a href={BASE_URL} target="_blank" rel="noreferrer">
                        <QuickLinkCardBase
                            quickLink={{
                                href: "",
                                icon: "🌱",
                                id: 0,
                                name: "StudRes",
                            }}
                        />
                    </a>
                    <a href={MMS_BASE_URL} target="_blank" rel="noreferrer">
                        <QuickLinkCardBase
                            quickLink={{
                                href: "",
                                icon: "✅",
                                id: 1,
                                name: "MMS",
                            }}
                        />
                    </a>
                    <a
                        href={MY_SAINT_BASE_URL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <QuickLinkCardBase
                            quickLink={{
                                href: MY_SAINT_BASE_URL,
                                icon: "🏛️",
                                id: 2,
                                name: "MySaint",
                            }}
                        />
                    </a>
                </QuickLinkContainer>
            </CompactLayout>
            {quickLinks && quickLinks?.length > 0 && (
                <>
                    <CompactLayout>
                        <p>Or your quick links:</p>
                        <QuickLinkContainer>
                            {quickLinks?.map((quickLink) => {
                                return (
                                    <a
                                        href={quickLink.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        key={quickLink.id}
                                    >
                                        <QuickLinkCardBase
                                            quickLink={quickLink}
                                        />
                                    </a>
                                )
                            })}
                        </QuickLinkContainer>
                    </CompactLayout>
                </>
            )}
        </body>
    )
}
