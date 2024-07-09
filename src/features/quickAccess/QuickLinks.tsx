import NiceModal from "@ebay/nice-modal-react"
import { useQuery } from "@tanstack/react-query"
import {
    ArrowLeftIcon,
    ChevronLeft,
    ChevronRight,
    Edit2Icon,
    Trash2Icon,
} from "lucide-react"
import { useState } from "react"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "../../components/ui/context-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
import CopyPathMenuItem from "../shared/contextMenuItems/CopyPathMenuItem"
import EditQuickLinkDialog from "../shared/dialogs/EditQuickLinkDialog"
import AddQuickLinkForm from "./AddQuickLinkForm"
import QuickLinkButton from "./QuickLinkButton"
import { QuickLinkCard } from "./QuickLinkCard"
import { QuickLinkContainer } from "./QuickLinkContainer"
import {
    deleteQuickLink,
    getQuickLinks,
    moveQuickLink,
} from "./QuickLinkManager"
import { generateQuickLinkInfo } from "./generateQuickLinkInfo"

export function QuickLinks() {
    const [isOpen, setIsOpen] = useState(false)

    const { data: quickLinks, refetch } = useQuery({
        queryKey: ["quicklinks"],
        queryFn: getQuickLinks,
    })

    const currentUrl = window.location.toString()
    const { href: currentQuickLinkHref, name: currentQuickLinkName } =
        generateQuickLinkInfo(currentUrl)

    const handleEditQuickLink = (id: number) => {
        const quickLinkToEdit = quickLinks?.find((link) => link.id === id)
        NiceModal.show(EditQuickLinkDialog, { quickLink: quickLinkToEdit })
    }

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

    return (
        <QuickLinkContainer>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <QuickLinkButton icon="➕" content="Save" />
                </PopoverTrigger>
                <PopoverContent>
                    <AddQuickLinkForm
                        href={currentQuickLinkHref}
                        name={currentQuickLinkName}
                        afterSubmit={handleQuickLinksUpdated}
                    />
                </PopoverContent>
            </Popover>
            {quickLinks && quickLinks?.length > 0 ? (
                quickLinks.map((quickLink, i) => {
                    return (
                        <ContextMenu key={quickLink.href}>
                            <ContextMenuTrigger>
                                <QuickLinkCard quickLink={quickLink} />
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuItem
                                    onSelect={() =>
                                        handleEditQuickLink(quickLink.id)
                                    }
                                >
                                    <Edit2Icon /> Edit link
                                </ContextMenuItem>
                                <CopyPathMenuItem href={quickLink.href} />
                                <ContextMenuItem
                                    disabled={i == quickLinks.length - 1}
                                    onSelect={async () => {
                                        await handleMoveRight(quickLink.id)
                                    }}
                                >
                                    <ChevronRight /> Move right
                                </ContextMenuItem>
                                <ContextMenuItem
                                    disabled={i == 0}
                                    onSelect={async () => {
                                        await handleMoveLeft(quickLink.id)
                                    }}
                                >
                                    <ChevronLeft /> Move left
                                </ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem
                                    onSelect={async () => {
                                        await handleRemoveQuickLink(
                                            quickLink.id
                                        )
                                    }}
                                >
                                    <Trash2Icon /> Delete
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    )
                })
            ) : (
                <p className="flex h-full items-center gap-1 text-sm text-muted-foreground">
                    <ArrowLeftIcon strokeWidth={1} />
                    <p>Add any URL to quick access by clicking the button</p>
                </p>
            )}
        </QuickLinkContainer>
    )
}
