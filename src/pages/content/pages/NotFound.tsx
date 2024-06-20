import { useCommand } from "@src/features/command/CommandContext"
import CommandInput from "@src/features/command/CommandInput"
import Commands from "@src/features/command/Commands"
import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import WideLayout from "@src/components/layouts/WideLayout"
import {
    getQuickLinks,
    QuickLinkContainer,
    QuickLinkCard,
} from "@src/features/quickAccess"
import H1 from "@src/components/typography/H1"
import { ConfigContext } from "@src/features/config"
import { BASE_URL } from "@src/features/versionControl"
import { QuickLink } from "@src/types/quickLinkTypes"
import { useQuery } from "@tanstack/react-query"
import { TriangleAlert } from "lucide-react"
import { useContext } from "react"

export default function NotFound() {
    const { data: quickLinks } = useQuery({
        queryKey: ["quicklinks"],
        queryFn: getQuickLinks,
    })

    const { setOpen } = useCommand()

    const handleCommandActivation = () => {
        setOpen(true)
    }

    const lastUrl = document.referrer

    const suggestedLinks: QuickLink[] = []

    if (lastUrl) {
        suggestedLinks.push({
            href: lastUrl,
            icon: "🔙",
            id: 2,
            name: "Last URL",
        })
    }

    suggestedLinks.push({
        href: BASE_URL,
        icon: "🌱",
        id: 1,
        name: "Homepage",
    })

    const { showCommandButton, showQuickLinks } = useContext(ConfigContext)

    return (
        <div className="min-h-screen bg-background py-2 text-foreground">
            <Commands />
            {showCommandButton && (
                <WideLayout>
                    <CommandInput onSelect={handleCommandActivation} />
                </WideLayout>
            )}
            <MainLayout>
                <CompactLayout>
                    <div className="flex items-center gap-2">
                        <TriangleAlert />
                        <H1>Not Found</H1>
                    </div>
                    <p className="text-muted-foreground">
                        Requested url
                        <span className="font-mono">
                            ({location.href.toString()})
                        </span>{" "}
                        was not found on the server.
                    </p>
                </CompactLayout>
                <CompactLayout>
                    <p>
                        {suggestedLinks.length > 1
                            ? "Try those links:"
                            : "Try this link:"}
                    </p>
                    <QuickLinkContainer>
                        {suggestedLinks.map((quickLink) => {
                            return (
                                <QuickLinkCard
                                    quickLink={quickLink}
                                    key={quickLink.id}
                                />
                            )
                        })}
                    </QuickLinkContainer>
                </CompactLayout>
                {showQuickLinks && quickLinks && (
                    <CompactLayout>
                        <p>Or your quick links:</p>
                        <QuickLinkContainer>
                            {quickLinks.map((quickLink) => {
                                return (
                                    <QuickLinkCard
                                        quickLink={quickLink}
                                        key={quickLink.id}
                                    />
                                )
                            })}
                        </QuickLinkContainer>
                    </CompactLayout>
                )}
            </MainLayout>
        </div>
    )
}
