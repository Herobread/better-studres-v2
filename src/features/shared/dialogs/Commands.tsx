import NiceModal, { useModal } from "@ebay/nice-modal-react"
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
import { DownloadFileCommand } from "@src/features/command/DownloadFileCommand"
import SaveQuickLinkCommand from "@src/features/command/SaveQuickLinkCommand"
import { SshDownloadFileCommand } from "@src/features/command/SshDownloadFileCommand"
import { ToggleEnhancePageCommand } from "@src/features/command/ToggleEnhancePageCommand"
import ToggleThemeCommand from "@src/features/command/ToggleThemeCommand"
import ViewArchiveCommand from "@src/features/command/ViewArchiveCommand"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import {
    BASE_URL,
    convertUrlSegmentsToUrl,
    extractUrlSegments,
    FileLinkPath,
    generateFileName,
    GET_FORMATTED_FILES_LIST_FOR_COMMAND_QUERY_KEY,
    getFormattedFilesListForCommand,
} from "@src/features/files"
import {
    GET_QUICK_LINKS_QUERY_KEY,
    getQuickLinks,
} from "@src/features/quickLinks"
import {
    isFileLikeUrl,
    streamFolderContents,
} from "@src/features/router/streamFolderContents"
import useSmoothRouter from "@src/features/router/useSmoothRouter"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"

export function Commands() {
    const { navigateToPage } = useSmoothRouter()

    const ref = useRef(null)
    const [pages, setPages] = useState<string[]>([])
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const abortControllerRef = useRef(new AbortController())

    const abortPathsSearch = () => {
        abortControllerRef.current.abort()
        abortControllerRef.current = new AbortController()
    }

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

    const handleDeepSearchCurrent = () => {
        setPages([...pages, ...currentUrlSegments])
    }

    const [searchPaths, setSearchPaths] = useState<string[]>([])

    useEffect(() => {
        if (pages.length !== 0) {
            const fetchPath = async () => {
                setIsLoading(true)
                const targetPath = convertUrlSegmentsToUrl(pages)
                const signal = abortControllerRef.current.signal

                for await (const data of streamFolderContents(targetPath)) {
                    if (signal.aborted) {
                        return
                    }

                    setSearchPaths((paths) => [...paths, data])
                }

                if (!signal.aborted) {
                    setIsLoading(false)
                }
            }

            fetchPath()
        }

        return () => {
            abortPathsSearch()
            setSearchPaths([])
        }
    }, [pages])

    const { visible } = useModal(CommandsDialog)

    useEffect(() => {
        if (pages.length === 0 || !visible) {
            abortPathsSearch()
            setIsLoading(false)
            return
        }
    }, [visible, pages])

    const { data: commandsData } = useQuery({
        queryKey: [GET_FORMATTED_FILES_LIST_FOR_COMMAND_QUERY_KEY],
        queryFn: getFormattedFilesListForCommand,
    })

    const listRef = useRef<HTMLDivElement>(null)
    const scrollId = useRef<ReturnType<typeof setTimeout>>()

    return (
        <Command
            ref={ref}
            onKeyDown={(e) => {
                if (e.key === "Escape" || (e.key === "Backspace" && !search)) {
                    e.preventDefault()
                    if (pages.length >= 1) {
                        setPages((pages) => pages.slice(0, -1))
                    } else {
                        abortPathsSearch()
                    }
                }

                if (e.key === "Tab") {
                    e.preventDefault()

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const selectedItem: any = getSelectedCommandItem(listRef)

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
                placeholder="Search..."
                value={search}
                onValueChange={(v) => {
                    setSearch(v)

                    // this is fix for scroll position reset on search
                    // src: https://github.com/pacocoursey/cmdk/issues/233#issuecomment-2015998940
                    clearTimeout(scrollId.current)

                    scrollId.current = setTimeout(() => {
                        const div = listRef.current
                        div?.scrollTo({ top: 0 })
                    }, 1)
                }}
            />
            <CommandList ref={listRef}>
                <CommandEmpty>No results found.</CommandEmpty>
                {pages.length === 0 && (
                    <>
                        {!isRootPage && (
                            <CommandGroup heading="Navigation">
                                <CommandItem onSelect={handleGoToParent}>
                                    🔙 Parent Directory
                                </CommandItem>
                                <CommandItem onSelect={handleDeepSearchCurrent}>
                                    🔍 Search subfolders
                                </CommandItem>
                                <SubCommandItem onSelect={handleGoToModuleRoot}>
                                    {moduleEmoji} Go to {moduleCode} root
                                </SubCommandItem>
                                <SubCommandItem onSelect={handleGoToRoot}>
                                    🌱 Go to root
                                </SubCommandItem>
                            </CommandGroup>
                        )}
                        {(!isRootPage ||
                            (quickLinks && quickLinks.length > 0)) && (
                            <CommandGroup heading="Pinned links">
                                {quickLinks &&
                                    quickLinks.map((quickLink) => {
                                        const { id, href, icon, name } =
                                            quickLink

                                        return (
                                            <CommandItem
                                                key={id}
                                                onSelect={() => {
                                                    navigateToPage(href)
                                                    NiceModal.hide(
                                                        CommandsDialog
                                                    )
                                                }}
                                            >
                                                {icon} {name}
                                            </CommandItem>
                                        )
                                    })}
                                {!isRootPage && <SaveQuickLinkCommand />}
                            </CommandGroup>
                        )}
                        <CommandGroup heading="Commands">
                            {!isRootPage && (
                                <>
                                    <ViewArchiveCommand />
                                    <DownloadFileCommand url={location.href} />
                                    <SshDownloadFileCommand
                                        url={location.href}
                                    />
                                </>
                            )}
                            <ToggleThemeCommand />
                        </CommandGroup>
                        <CommandGroup heading="Other">
                            <ClearVersionTrackingDataCommand />
                            <ClearBlackListCommand />
                            <ToggleEnhancePageCommand />
                        </CommandGroup>
                        <ModuleCommandGroup
                            search={search}
                            setSearch={setSearch}
                            pages={pages}
                            setPages={setPages}
                        />
                        <VisitedPathsCommandGroup
                            search={search}
                            commandsData={commandsData}
                        />
                    </>
                )}
                {pages.length >= 1 && (
                    <>
                        {searchPaths.map((url) => {
                            const urlSegments = extractUrlSegments(url)
                            const urlSegmentsString = urlSegments.join("/")
                            const name = generateFileName(url)

                            const onTab = isFileLikeUrl(url)
                                ? undefined
                                : () => {
                                      setPages([...urlSegments])
                                      setSearch("")
                                  }

                            return (
                                <CommandItem
                                    onTab={onTab}
                                    value={urlSegmentsString}
                                    keywords={[...urlSegments]}
                                    key={urlSegmentsString}
                                    onSelect={() => {
                                        navigateToPage(url)
                                        NiceModal.hide(CommandsDialog)
                                    }}
                                >
                                    <div className="grid gap-1">
                                        <div className="flex flex-wrap gap-2">
                                            {name}
                                        </div>
                                        <span className="text-muted-foreground">
                                            {urlSegmentsString}
                                        </span>
                                    </div>
                                </CommandItem>
                            )
                        })}
                    </>
                )}
            </CommandList>
        </Command>
    )
}

function ModuleCommandGroup({
    search,
    setSearch,
    pages,
    setPages,
}: {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    pages: string[]
    setPages: React.Dispatch<React.SetStateAction<string[]>>
}) {
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
                        onTab={() => {
                            setPages([...pages, code])
                            setSearch("")
                        }}
                        key={code}
                        value={code}
                        onSelect={() => {
                            navigateToPage(BASE_URL + code)
                            NiceModal.hide(CommandsDialog)
                        }}
                    >
                        <div className="grid gap-1">
                            {getModuleEmoji(code)} {code}
                            <span className="text-muted-foreground">
                                {name}
                            </span>
                        </div>
                    </CommandItem>
                ))}
            </CommandGroup>
        )
    )
}

function VisitedPathsCommandGroup({
    search,
    commandsData,
}: {
    search: string
    commandsData: FileLinkPath[] | undefined
}) {
    const { navigateToPage } = useSmoothRouter()

    return (
        <>
            {search && (
                <>
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
                </>
            )}
        </>
    )
}
