import QuickLinkContainer from "./QuickLinkContainer"
import QuickLinkCard from "./QuickLinkCard"
import { addQuickLink, deleteQuickLink, loadQuickLinks } from "./QuickLinkManager"
import { useQuery } from "@tanstack/react-query"
import QuickLinkButton from "./QuickLinkButton"
import { useState } from "react"
import generateQuickLinkInfo from "./generateQuickLinkInfo"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Input } from "../ui/input"
import CompactLayout from "../layouts/CompactLayout"
import { Button } from "../ui/button"
import AddQuickLinkForm from "./AddQuickLinkForm"

export default function QuickLinks() {
	const [isEditing, setIsEditing] = useState(false)

	const { data, refetch } = useQuery({
		queryKey: ['quickLinks'],
		queryFn: loadQuickLinks
	})

	const currentUrl = window.location.toString()
	const isSaveable = !(data?.some(e => e.href === currentUrl))
	const currentUrlQuickLink = generateQuickLinkInfo(currentUrl)

	const handleAddQuickLink = async () => {
		if (!isSaveable) {
			return
		}

		await addQuickLink(currentUrlQuickLink)
		await refetch()
	}

	const handleRemoveQuickLink = async () => {
		await deleteQuickLink(currentUrl)
		await refetch()
	}

	const handleSwitchEditMode = () => {
		setIsEditing(isEditing => !isEditing)
	}

	return <QuickLinkContainer>
		{
			data && data.map(quickLink => {
				// if (quickLink.name === activeUrlQuickLink.name)
				// 	return <QuickLinkButton onClick={handleRemoveQuickLink} icon="📍" content={activeUrlQuickLink.name} />

				return <QuickLinkCard quickLink={quickLink} key={quickLink.href} />
			})
		}
		<Popover>
			<PopoverTrigger>
				<QuickLinkButton icon="➕" content="Save" />
			</PopoverTrigger>
			<PopoverContent>
				<AddQuickLinkForm href={currentUrlQuickLink.href} name={currentUrlQuickLink.name} />
			</PopoverContent>
		</Popover>
		{/* <QuickLinkButton onClick={handleSwitchEditMode} icon={isEditing ? "👌" : "✏"} /> */}
	</QuickLinkContainer>
}