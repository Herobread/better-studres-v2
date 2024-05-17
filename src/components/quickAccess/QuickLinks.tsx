import QuickLinkContainer from "./QuickLinkContainer"
import QuickLinkCard from "./QuickLinkCard"
import { deleteQuickLink, loadQuickLinks, moveQuickLink } from "./QuickLinkManager"
import { useQuery } from "@tanstack/react-query"
import QuickLinkButton from "./QuickLinkButton"
import generateQuickLinkInfo from "./generateQuickLinkInfo"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import AddQuickLinkForm from "./AddQuickLinkForm"
import { useState } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "../ui/context-menu"
import { Dialog, DialogContent } from "../ui/dialog"
import EditQuickLinkForm from "./EditQuickLinkForm"
import { ChevronLeft, ChevronRight, Edit2Icon, Trash2Icon } from "lucide-react"

export default function QuickLinks() {
	const [isOpen, setIsOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [editLinkId, setEditLinkId] = useState(-1)

	const { data: quickLinks, refetch } = useQuery({
		queryKey: ['quicklinks'],
		queryFn: loadQuickLinks
	})

	const quickLinkToEdit = quickLinks?.find(link => link.id === editLinkId)

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

	const handleMoveRight = async (id: number) => {
		await moveQuickLink(id, 1)
		await refetch()
	}

	const handleMoveLeft = async (id: number) => {
		await moveQuickLink(id, -1)
		await refetch()
	}

	return <QuickLinkContainer>
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<QuickLinkButton icon="➕" content="Save" />
			</PopoverTrigger>
			<PopoverContent>
				<AddQuickLinkForm href={currentUrlQuickLink.href} name={currentUrlQuickLink.name} afterSubmit={handleQuickLinksUpdated} />
			</PopoverContent>
		</Popover>
		{
			quickLinks && quickLinks.map((quickLink, i) => {
				return <ContextMenu key={quickLink.href}>
					<ContextMenuTrigger>
						<QuickLinkCard quickLink={quickLink} />
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem onSelect={() => {
							setEditLinkId(quickLink.id)
							setIsEditDialogOpen(true)
						}}>
							<Edit2Icon /> Edit link
						</ContextMenuItem>
						<ContextMenuItem
							disabled={i == quickLinks.length - 1}
							onSelect={async () => {
								await handleMoveRight(quickLink.id)
							}}>
							<ChevronRight /> Move right
						</ContextMenuItem>
						<ContextMenuItem
							disabled={i == 0}
							onSelect={async () => {
								await handleMoveLeft(quickLink.id)
							}}>
							<ChevronLeft /> Move left
						</ContextMenuItem>
						<ContextMenuSeparator />
						<ContextMenuItem onSelect={async () => {
							await handleRemoveQuickLink(quickLink.id)
						}}>
							<Trash2Icon /> Delete
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
						<p>Quick link not found</p>
				}
			</DialogContent>
		</Dialog>
	</QuickLinkContainer>
}