import { BASE_URL, getFiles, mapVirtualFilesToList } from "@src/content/versionControl/virtualFileSystem"
import { useQuery } from "@tanstack/react-query"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"
import { useCallback, useEffect } from "react"
import { loadQuickLinks } from "../quickAccess/QuickLinkManager"
import redirect from "@src/lib/redirect"
import generateVirtualPath from "@src/content/versionControl/generateVirtualPath"
import generateUrlFromVirtualPath from "@src/content/versionControl/generateUrlFromVirtualPath"
import { getModuleEmoji } from "@src/content/enhancers/moduleEmoji/getModuleEmoji"
import { useCommand } from "./CommandContext"

export default function Commands() {
	const { open, setOpen } = useCommand()

	const { data: commandsData } = useQuery({
		queryKey: ['commands'],
		queryFn: getFiles,
		select(data) {
			return mapVirtualFilesToList(data.files || {})
		},
	})

	const { data: quickLinks } = useQuery({
		queryKey: ['quicklinks'],
		queryFn: loadQuickLinks
	})

	const toggleOpen = useCallback(() => {
		setOpen(!open);
	}, [setOpen]);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				toggleOpen();
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [toggleOpen]);

	const currentUrl = window.location.toString()
	const currentVirtualPath = generateVirtualPath(currentUrl)

	const moduleCode = currentVirtualPath[0]
	const moduleEmoji = getModuleEmoji(moduleCode)

	const handleGoToParent = () => {
		currentVirtualPath.pop()

		redirect(generateUrlFromVirtualPath(currentVirtualPath), 'userClick')
	}

	const handleGoToModuleRoot = () => {
		redirect(generateUrlFromVirtualPath([currentVirtualPath[0]]))
	}

	const handleGoToRoot = () => {
		redirect(BASE_URL)
	}

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading='Actions'>
					<CommandItem onSelect={handleGoToParent}>🔙 Go to Parent Directory</CommandItem>
					<CommandItem onSelect={handleGoToModuleRoot}>{moduleEmoji} Go to {moduleCode} root</CommandItem>
					<CommandItem onSelect={handleGoToRoot}>🌱 Go to homepage</CommandItem>
				</CommandGroup>
				<CommandGroup heading='Quick links'>
					{
						quickLinks && quickLinks.map(quickLink => {
							const { id, href, icon, name } = quickLink

							return <CommandItem key={id} onSelect={() => {
								redirect(href, 'userClick')
							}}>
								{icon} {name}
							</CommandItem>
						})
					}
				</CommandGroup>
				<CommandGroup heading='Visited paths'>
					{
						commandsData && commandsData.map(item => {
							const virtualPath = generateVirtualPath(item.href)
							const virtualPathString = virtualPath.join('/')

							return <CommandItem keywords={[item.href]} key={virtualPathString} onSelect={() => {
								redirect(item.href, 'userClick')
							}}
								className="grid gap-1"
							>
								{item.name}
								<span className="text-muted-foreground">
									{virtualPathString}
								</span>
							</CommandItem>
						})
					}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)

}