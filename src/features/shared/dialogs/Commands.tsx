import NiceModal from "@ebay/nice-modal-react"
import { Badge } from "@src/components/ui/badge"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    getSelectedCommandItem,
    SubCommandItem,
} from "@src/components/ui/command"
import { departments, modules } from "@src/constants/modules"
import ClearBlackListCommand from "@src/features/command/ClearBlackListCommand"
import ClearVersionTrackingDataCommand from "@src/features/command/ClearVersionTrackingDataCommand"
import SaveQuickLinkCommand from "@src/features/command/SaveQuickLinkCommand"
import { ToggleEnhancePageCommand } from "@src/features/command/ToggleEnhancePageCommand"
import ToggleThemeCommand from "@src/features/command/ToggleThemeCommand"
import ViewArchiveCommand from "@src/features/command/ViewArchiveCommand"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import {
    BASE_URL,
    convertUrlSegmentsToUrl,
    extractUrlSegments,
    GET_FORMATTED_FILES_LIST_FOR_COMMAND_QUERY_KEY,
    getFormattedFilesListForCommand,
} from "@src/features/files"
import {
    GET_QUICK_LINKS_QUERY_KEY,
    getQuickLinks,
} from "@src/features/quickLinks"
import { streamFolderContents } from "@src/features/router/streamFolderContents"
import useSmoothRouter from "@src/features/router/useSmoothRouter"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { useQuery } from "@tanstack/react-query"
import { useRef, useState } from "react"

export function Commands() {
    const { navigateToPage } = useSmoothRouter()

    const ref = useRef(null)
    const [pages, setPages] = useState<string[]>([])
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

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

    return (
        <Command
            ref={ref}
            onKeyDown={(e) => {
                if (e.key === "Escape" || (e.key === "Backspace" && !search)) {
                    e.preventDefault()
                    setPages((pages) => pages.slice(0, -1))
                }

                if (e.key === "Tab") {
                    e.preventDefault()

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const selectedItem: any = getSelectedCommandItem(ref)

                    if (selectedItem && selectedItem.__onTab) {
                        setIsLoading(true)
                        selectedItem.__onTab()
                    }
                }
            }}
        >
            <CommandInput
                isLoading={isLoading}
                pages={pages}
                placeholder="Type a command or search..."
                value={search}
                onValueChange={setSearch}
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {pages.length === 0 && (
                    <>
                        <CommandItem
                            onTab={() => {
                                setPages([...pages, "CS1002"])
                                setSearch("")
                            }}
                            onSelect={async () => {
                                for await (const data of streamFolderContents(
                                    location.href
                                )) {
                                    console.log(data)
                                }
                            }}
                        >
                            Select + Tab to add new page to commands
                        </CommandItem>
                        {!isRootPage && (
                            <CommandGroup heading="Navigation">
                                <CommandItem onSelect={handleGoToParent}>
                                    🔙 Go to Parent Directory
                                </CommandItem>
                                <SubCommandItem onSelect={handleGoToModuleRoot}>
                                    {moduleEmoji} Go to {moduleCode} root
                                </SubCommandItem>
                                <SubCommandItem onSelect={handleGoToRoot}>
                                    🌱 Go to root
                                </SubCommandItem>
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
                            <ViewArchiveCommand />
                            <ToggleThemeCommand />
                        </CommandGroup>
                        <CommandGroup heading="Other">
                            <ClearVersionTrackingDataCommand />
                            <ClearBlackListCommand />
                            <ToggleEnhancePageCommand />
                        </CommandGroup>
                        <ModuleCommandGroup search={search} />
                        <VisitedPathsCommandGroup />
                    </>
                )}
                {pages.length === 1 && (
                    <>
                        <CommandItem>
                            module specific links commands
                        </CommandItem>
                    </>
                )}
            </CommandList>
        </Command>
    )
}

function ModuleCommandGroup({ search }: { search: string }) {
    const { navigateToPage } = useSmoothRouter()

    const isDepartmentIncluded = departments.some((dept) =>
        search.toLowerCase().includes(dept.toLowerCase())
    )

    const isModuleLikeSearchQuery = /\d{3,4}/.test(search)

    return (
        (isDepartmentIncluded || isModuleLikeSearchQuery) && (
            <CommandGroup heading="Modules">
                {modules.map(({ code, name }) => (
                    <CommandItem
                        className="grid gap-1"
                        key={code}
                        value={code}
                        onSelect={() => {
                            navigateToPage(BASE_URL + code)
                            NiceModal.hide(CommandsDialog)
                        }}
                    >
                        {getModuleEmoji(code)} {code}
                        <span className="text-muted-foreground">{name}</span>
                    </CommandItem>
                ))}
            </CommandGroup>
        )
    )
}

function VisitedPathsCommandGroup() {
    const { navigateToPage } = useSmoothRouter()

    const { data: commandsData } = useQuery({
        queryKey: [GET_FORMATTED_FILES_LIST_FOR_COMMAND_QUERY_KEY],
        queryFn: getFormattedFilesListForCommand,
    })

    return (
        <CommandGroup heading="Visited paths">
            {commandsData &&
                commandsData.map((item) => {
                    const urlSegments = extractUrlSegments(item.href)
                    const urlSegmentsString = urlSegments.join("/")

                    return (
                        <CommandItem
                            value={urlSegmentsString}
                            keywords={[...urlSegments, ...item.tags]}
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
                                        return <Badge key={tag}>{tag}</Badge>
                                    })}
                            </div>
                            <span className="text-muted-foreground">
                                {urlSegmentsString}
                            </span>
                        </CommandItem>
                    )
                })}
        </CommandGroup>
    )
}
