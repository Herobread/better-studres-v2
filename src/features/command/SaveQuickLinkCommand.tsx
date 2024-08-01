import NiceModal from "@ebay/nice-modal-react"
import {
    addQuickLink,
    deleteQuickLink,
    generateQuickLinkInfo,
    GET_QUICK_LINKS_QUERY_KEY,
    getQuickLinks,
} from "@src/features/quickLinks"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { CommandItem } from "../../components/ui/command"
import { useToast } from "../../components/ui/use-toast"

export default function SaveQuickLinkCommand() {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const currentUrl = location.href.toString()

    const { data: quickLinks } = useQuery({
        queryKey: [GET_QUICK_LINKS_QUERY_KEY],
        queryFn: getQuickLinks,
    })

    const currentPageQuickLink = quickLinks?.find((quickLink) => {
        if (quickLink.href === currentUrl) {
            return quickLink.id
        }
    })

    const { href, name, icon } = generateQuickLinkInfo(currentUrl)

    const handleRemoveQuickLink = async () => {
        try {
            if (!currentPageQuickLink) {
                throw new Error("Quick link doesn't exist")
            }

            await deleteQuickLink(currentPageQuickLink.id)

            await queryClient.invalidateQueries({
                queryKey: [GET_QUICK_LINKS_QUERY_KEY],
            })
            await queryClient.refetchQueries({
                queryKey: [GET_QUICK_LINKS_QUERY_KEY],
            })

            toast({
                title: "✅ Success",
                description: `Removed ${icon} ${name} from quick links`,
            })
        } catch (error) {
            toast({
                title: "❌ Error",
                description: "Failed to delete quick link. Please try again.",
            })
        }

        NiceModal.hide(CommandsDialog)
    }

    if (currentPageQuickLink) {
        return (
            <CommandItem onSelect={handleRemoveQuickLink}>
                ➖ Unpin {icon} {name}
            </CommandItem>
        )
    }

    const handleSaveQuickLink = async () => {
        try {
            await addQuickLink({
                href,
                name,
                icon,
            })

            await queryClient.invalidateQueries({
                queryKey: [GET_QUICK_LINKS_QUERY_KEY],
            })
            await queryClient.refetchQueries({
                queryKey: [GET_QUICK_LINKS_QUERY_KEY],
            })

            toast({
                title: "✅ Success",
                description: `Saved ${icon} ${name} to quick links`,
            })
        } catch (error) {
            toast({
                title: "❌ Error",
                description: "Failed to save quick link. Please try again.",
            })
        }

        NiceModal.hide(CommandsDialog)
    }

    return (
        <CommandItem
            onSelect={handleSaveQuickLink}
            keywords={["save", "link", "pin"]}
        >
            ➕ Pin {`${icon} ${name}`}
        </CommandItem>
    )
}
