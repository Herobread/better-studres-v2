import NiceModal from "@ebay/nice-modal-react"
import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import WideLayout from "@src/components/layouts/WideLayout"
import H1 from "@src/components/typography/H1"
import CommandInput from "@src/features/command/CommandInput"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { ConfigContext } from "@src/features/config"
import {
    BASE_URL,
    convertUrlSegmentsToUrl,
    extractUrlSegments,
} from "@src/features/files"
import {
    GET_QUICK_LINKS_QUERY_KEY,
    getQuickLinks,
    QuickLink,
} from "@src/features/quickLinks"
import {
    QuickLinkContainer,
    QuickLinkList,
} from "@src/features/quickLinks/components"
import { QuickLinkLink } from "@src/features/quickLinks/components/quickLink/QuickLinkLink"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { useQuery } from "@tanstack/react-query"
import { ShieldAlert } from "lucide-react"
import { useContext } from "react"

export default function Forbidden() {
    const { data: quickLinks } = useQuery({
        queryKey: [GET_QUICK_LINKS_QUERY_KEY],
        queryFn: getQuickLinks,
    })

    const handleCommandActivation = () => {
        NiceModal.show(CommandsDialog)
    }

    const suggestedLinks: QuickLink[] = []

    const url = location.href
    const urlSegments = extractUrlSegments(url)
    urlSegments.pop()
    const parentUrl = convertUrlSegmentsToUrl(urlSegments)

    if (urlSegments.length !== 0) {
        suggestedLinks.push({
            href: parentUrl,
            icon: "⬅️",
            id: 2,
            name: "Parent directory",
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
            <CommandsShortcutMount />
            {showCommandButton && (
                <WideLayout>
                    <CommandInput onSelect={handleCommandActivation} />
                </WideLayout>
            )}
            <MainLayout>
                <CompactLayout>
                    <div className="flex items-center gap-2">
                        <ShieldAlert />
                        <H1>Forbidden</H1>
                    </div>
                    <p>You don&apos;t have permission to access this resource.</p>
                    <p className="font-mono">{location.href.toString()}</p>
                    <p className="text-muted-foreground">
                        If you believe you should have access:
                    </p>
                    <ul className="list-inside list-disc text-muted-foreground">
                        <li>
                            Check if you are logged in with the correct account.
                        </li>
                        <li>
                            Contact the resource owner to request access.
                        </li>
                        <li>
                            The resource might have been moved or its permissions changed.
                        </li>
                    </ul>
                    <p className="text-muted-foreground">
                        If this doesn&apos;t resolve the problem, temporarily
                        disable the extension and report the issue on{" "}
                        <a
                            href="https://github.com/Herobread/better-studres-v2"
                            rel="noreferrer"
                            target="_blank"
                        >
                            GitHub
                        </a>
                        .
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
                                <QuickLinkLink
                                    quickLink={quickLink}
                                    key={quickLink.id}
                                />
                            )
                        })}
                    </QuickLinkContainer>
                </CompactLayout>
                {showQuickLinks && quickLinks && quickLinks?.length > 0 && (
                    <CompactLayout>
                        <p>Or your pinned links:</p>
                        <QuickLinkContainer>
                            <QuickLinkList />
                        </QuickLinkContainer>
                    </CompactLayout>
                )}
            </MainLayout>
        </div>
    )
} 