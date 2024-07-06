import { Badge } from "@src/components/ui/badge"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import {
    BASE_URL,
    convertUrlSegmentsToUrl,
    extractUrlSegments,
    getFormattedFilesListForCommand,
} from "@src/features/files"
import { redirect } from "@src/features/router/"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../components/ui/command"
import { getQuickLinks } from "../quickAccess"
import ClearBlackListCommand from "./ClearBlackListCommand"
import ClearVersionTrackingDataCommand from "./ClearVersionTrackingDataCommand"
import { useCommand } from "./CommandContext"
import SaveQuickLinkCommand from "./SaveQuickLinkCommand"
import { ToggleEnhancePageCommand } from "./ToggleEnhancePageCommand"
import ToggleThemeCommand from "./ToggleThemeCommand"

export default function Commands() {
    const { open, setOpen } = useCommand()

    const { data: commandsData } = useQuery({
        queryKey: ["commands"],
        queryFn: getFormattedFilesListForCommand,
    })

    const { data: quickLinks } = useQuery({
        queryKey: ["quicklinks"],
        queryFn: getQuickLinks,
    })

    const toggleOpen = useCallback(() => {
        setOpen(!open)
    }, [setOpen])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggleOpen()
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [toggleOpen])

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
        <CommandDialog open={open} onOpenChange={setOpen}>
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
                    <SaveQuickLinkCommand setIsCommandOpen={setOpen} />
                </CommandGroup>
                <CommandGroup heading="Commands">
                    <ToggleThemeCommand setIsCommandOpen={setOpen} />
                    <ToggleEnhancePageCommand />
                    <ClearVersionTrackingDataCommand
                        setIsCommandOpen={setOpen}
                    />
                    <ClearBlackListCommand setIsCommandOpen={setOpen} />
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
}
