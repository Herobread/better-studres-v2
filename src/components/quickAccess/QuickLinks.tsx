import QuickLinkContainer from "./QuickLinkContainer"
import QuickLinkCard from "./QuickLinkCard"
import { deleteQuickLink, loadQuickLinks } from "./QuickLinkManager"
import { useQuery } from "@tanstack/react-query"
import QuickLinkButton from "./QuickLinkButton"
import generateQuickLinkInfo from "./generateQuickLinkInfo"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import AddQuickLinkForm from "./AddQuickLinkForm"
import { useState } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu"

export default function QuickLinks() {
	const [isOpen, setIsOpen] = useState(false)

	const { data, refetch } = useQuery({
		queryKey: ['quickLinks'],
		queryFn: loadQuickLinks
	})

	const currentUrl = window.location.toString()
	const currentUrlQuickLink = generateQuickLinkInfo(currentUrl)

	const handleAfterAddQuickLink = async () => {
		await refetch()
		setIsOpen(false)
	}

	const handleRemoveQuickLink = async (id: number) => {
		await deleteQuickLink(id)
		await refetch()
	}

	return <QuickLinkContainer>
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger>
				<QuickLinkButton icon="➕" content="Save" />
			</PopoverTrigger>
			<PopoverContent>
				<AddQuickLinkForm href={currentUrlQuickLink.href} name={currentUrlQuickLink.name} afterSubmit={handleAfterAddQuickLink} />
			</PopoverContent>
		</Popover>
		{
			data && data.map(quickLink => {
				return <ContextMenu key={quickLink.href}>
					<ContextMenuTrigger>
						<QuickLinkCard quickLink={quickLink} />
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem>
							<button onClick={() => { console.log('aaaaaaaaaaaa') }}>
								Edit
							</button>
						</ContextMenuItem>
						<ContextMenuItem>
							<button onClick={async () => {
								await handleRemoveQuickLink(quickLink.id)
							}}>
								Delete
							</button>
						</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
			})
		}
	</QuickLinkContainer>
}