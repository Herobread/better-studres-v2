import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { Badge } from "@src/components/ui/badge"
import {
    CommandDialog,
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
} from "@src/features/quickAccess"
import { redirect } from "@src/features/router"
import { useQuery } from "@tanstack/react-query"

export default NiceModal.create(() => {
    const modalHandler = useModal()

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

        redirect(convertUrlSegmentsToUrl(currentUrlSegments), "userClick")
    }

    const handleGoToModuleRoot = () => {
        redirect(convertUrlSegmentsToUrl([currentUrlSegments[0]]))
    }

    const handleGoToRoot = () => {
        redirect(BASE_URL)
    }

    return (
        <CommandDialog handler={modalHandler}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                    <CommandItem onSelect={handleGoToParent}>
                        🔙 Go to Parent Directory
                    </CommandItem>
                    <CommandItem onSelect={handleGoToModuleRoot}>
                        {moduleEmoji} Go to {moduleCode} root
                    </CommandItem>
                    <CommandItem onSelect={handleGoToRoot}>
                        🌱 Go to homepage
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Quick links">
                    {quickLinks &&
                        quickLinks.map((quickLink) => {
                            const { id, href, icon, name } = quickLink

                            return (
                                <CommandItem
                                    key={id}
                                    onSelect={() => {
                                        redirect(href, "userClick")
                                    }}
                                >
                                    {icon} {name}
                                </CommandItem>
                            )
                        })}
                    <SaveQuickLinkCommand />
                </CommandGroup>
                <CommandGroup heading="Commands">
                    <ToggleThemeCommand />
                    <ToggleEnhancePageCommand />
                    <ClearVersionTrackingDataCommand />
                    <ClearBlackListCommand />
                </CommandGroup>
                <CommandGroup heading="Visited paths">
                    {commandsData &&
                        commandsData.map((item) => {
                            const urlSegments = extractUrlSegments(item.href)
                            const urlSegmentsString = urlSegments.join("/")

                            return (
                                <CommandItem
                                    keywords={[item.href, ...item.tags]}
                                    key={urlSegmentsString}
                                    onSelect={() => {
                                        redirect(item.href, "userClick")
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
            </CommandList>
        </CommandDialog>
    )
})
