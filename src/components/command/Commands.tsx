import { getFiles, mapVirtualFilesToList } from "@src/content/versionControl/virtualFileSystem"
import { useQuery } from "@tanstack/react-query"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"
import { useEffect, useState } from "react"
import { loadQuickLinks } from "../quickAccess/QuickLinkManager"

export default function Commands() {
	const [open, setOpen] = useState(false)

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

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}
		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [])


	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading='Quick links'>
					{
						quickLinks && quickLinks.map(quickLink => {
							const { id, href, icon, name } = quickLink

							return <CommandItem key={id} onSelect={() => {
								window.location.replace(href)
							}}>
								{icon} {name}
							</CommandItem>
						})
					}
				</CommandGroup>

				<CommandGroup heading='Visited paths'>
					{
						commandsData && commandsData.map(item => {
							return <CommandItem keywords={[item.href]} key={item.href} onSelect={() => {
								window.location.replace(item.href);
							}}>{item.name}</CommandItem>
						})
					}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)

}