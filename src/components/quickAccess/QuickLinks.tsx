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
import { Dialog, DialogContent } from "../ui/dialog"
import EditQuickLinkForm from "./EditQuickLinkForm"

export default function QuickLinks() {
	const [isOpen, setIsOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [editLinkId, setEditLinkId] = useState(-1)

	const { data, refetch } = useQuery({
		queryKey: ['quickLinks'],
		queryFn: loadQuickLinks
	})

	const quickLinkToEdit = data?.find(link => link.id === editLinkId)

	const currentUrl = window.location.toString()
	const currentUrlQuickLink = generateQuickLinkInfo(currentUrl)

	const handleQuickLinksUpdated = async () => {
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
				<AddQuickLinkForm href={currentUrlQuickLink.href} name={currentUrlQuickLink.name} afterSubmit={handleQuickLinksUpdated} />
			</PopoverContent>
		</Popover>
		{
			data && data.map(quickLink => {
				return <ContextMenu key={quickLink.href}>
					<ContextMenuTrigger>
						<QuickLinkCard quickLink={quickLink} />
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem onSelect={() => {
							setEditLinkId(quickLink.id)
							setIsEditDialogOpen(true)
						}}>
							Edit
						</ContextMenuItem>
						<ContextMenuItem onSelect={async () => {
							await handleRemoveQuickLink(quickLink.id)
						}}>
							Delete
						</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
			})
		}

		<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
			<DialogContent>
				{
					quickLinkToEdit ? <EditQuickLinkForm quickLink={quickLinkToEdit} afterSubmit={() => {
						setEditLinkId(-1)
						setIsEditDialogOpen(false)
						handleQuickLinksUpdated()
					}} />
						:
						<p>unable to edit</p>
				}
			</DialogContent>
		</Dialog>
	</QuickLinkContainer>
}