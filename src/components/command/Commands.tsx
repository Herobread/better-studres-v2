import { getFiles, mapVirtualFilesToList } from "@src/content/versionControl/virtualFileSystem"
import { useQuery } from "@tanstack/react-query"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"
import { useEffect, useState } from "react"

export default function Commands() {
	const [open, setOpen] = useState(false)

	const { data } = useQuery({
		queryKey: ['commands'],
		queryFn: getFiles,
		select(data) {
			return mapVirtualFilesToList(data.files || {})
		},
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
				<CommandGroup heading='Visited paths'>
					{
						data && data.map(item => {
							return <CommandItem disabled={false} keywords={[item.href]} key={item.href} onSelect={() => {
								window.location.replace(item.href);
							}}>{item.name}</CommandItem>
						})
					}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)

}