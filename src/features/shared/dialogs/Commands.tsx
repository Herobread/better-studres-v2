import NiceModal from "@ebay/nice-modal-react"
import { Badge } from "@src/components/ui/badge"
import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@src/components/ui/command"
import ClearBlackListCommand from "@src/features/command/ClearBlackListCommand"
import ClearVersionTrackingDataCommand from "@src/features/command/ClearVersionTrackingDataCommand"
import SaveQuickLinkCommand from "@src/features/command/SaveQuickLinkCommand"
import { ToggleEnhancePageCommand } from "@src/features/command/ToggleEnhancePageCommand"
import ToggleThemeCommand from "@src/features/command/ToggleThemeCommand"
import ViewArchiveCommand from "@src/features/command/ViewArchiveCommand"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import {
    BASE_URL,
    GET_FORMATTED_FILES_LIST_FOR_COMMAND_QUERY_KEY,
    convertUrlSegmentsToUrl,
    extractUrlSegments,
    getFormattedFilesListForCommand,
} from "@src/features/files"
import {
    GET_QUICK_LINKS_QUERY_KEY,
    getQuickLinks,
} from "@src/features/quickLinks"
import useSmoothRouter from "@src/features/router/useSmoothRouter"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { useQuery } from "@tanstack/react-query"
import { useCommandState } from "cmdk"

export function Commands() {
    const { navigateToPage } = useSmoothRouter()

    const { data: commandsData } = useQuery({
        queryKey: [GET_FORMATTED_FILES_LIST_FOR_COMMAND_QUERY_KEY],
        queryFn: getFormattedFilesListForCommand,
    })

    const { data: quickLinks } = useQuery({
        queryKey: [GET_QUICK_LINKS_QUERY_KEY],
        queryFn: getQuickLinks,
    })

    const currentUrl = window.location.toString()
    const currentUrlSegments = extractUrlSegments(currentUrl)

    const moduleCode = currentUrlSegments[0]
    const moduleEmoji = getModuleEmoji(moduleCode)

    const handleGoToParent = () => {
        currentUrlSegments.pop()

        navigateToPage(convertUrlSegmentsToUrl(currentUrlSegments))
        NiceModal.hide(CommandsDialog)
    }

    const handleGoToModuleRoot = () => {
        navigateToPage(convertUrlSegmentsToUrl([currentUrlSegments[0]]))
        NiceModal.hide(CommandsDialog)
    }

    const isRootPage = currentUrlSegments.length === 0

    const handleGoToRoot = () => {
        navigateToPage(BASE_URL)
        NiceModal.hide(CommandsDialog)
    }

    const search = useCommandState((state) => state.search)

    return (
        <>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {!isRootPage && (
                    <CommandGroup heading="Navigation">
                        <CommandItem onSelect={handleGoToParent}>
                            🔙 Go to Parent Directory
                        </CommandItem>
                        <CommandItem onSelect={handleGoToModuleRoot}>
                            {moduleEmoji} Go to {moduleCode} root
                        </CommandItem>
                        <CommandItem onSelect={handleGoToRoot}>
                            🌱 Go to root
                        </CommandItem>
                    </CommandGroup>
                )}
                <CommandGroup heading="Pinned links">
                    {quickLinks &&
                        quickLinks.map((quickLink) => {
                            const { id, href, icon, name } = quickLink

                            return (
                                <CommandItem
                                    key={id}
                                    onSelect={() => {
                                        navigateToPage(href)
                                        NiceModal.hide(CommandsDialog)
                                    }}
                                >
                                    {icon} {name}
                                </CommandItem>
                            )
                        })}
                    {!isRootPage && <SaveQuickLinkCommand />}
                </CommandGroup>
                <CommandGroup heading="Commands">
                    <ToggleThemeCommand />
                    <ToggleEnhancePageCommand />
                    <ClearVersionTrackingDataCommand />
                    <ClearBlackListCommand />
                    <ViewArchiveCommand />
                </CommandGroup>
                {search && (
                    <CommandGroup heading="Visited paths">
                        {commandsData &&
                            commandsData.map((item) => {
                                const urlSegments = extractUrlSegments(
                                    item.href
                                )
                                const urlSegmentsString = urlSegments.join("/")

                                return (
                                    <CommandItem
                                        value={urlSegmentsString}
                                        keywords={[
                                            ...urlSegments,
                                            ...item.tags,
                                        ]}
                                        key={urlSegmentsString}
                                        onSelect={() => {
                                            navigateToPage(item.href)
                                            NiceModal.hide(CommandsDialog)
                                        }}
                                        className="grid gap-1"
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            {item.name}
                                            {item.tags.length > 0 &&
                                                item.tags.map((tag) => {
                                                    return (
                                                        <Badge key={tag}>
                                                            {tag}
                                                        </Badge>
                                                    )
                                                })}
                                        </div>
                                        <span className="text-muted-foreground">
                                            {urlSegmentsString}
                                        </span>
                                    </CommandItem>
                                )
                            })}
                    </CommandGroup>
                )}
            </CommandList>
        </>
    )
}
