import { useQuery, useQueryClient } from "@tanstack/react-query"
import { CommandItem } from "../ui/command"
import { useToast } from "../ui/use-toast"
import {
    addQuickLink,
    deleteQuickLink,
    getQuickLinks,
} from "@src/features/quickAccess"
import { generateQuickLinkInfo } from "@src/features/quickAccess"

interface SaveQuickLinkCommandProps {
    setIsCommandOpen: (open: boolean) => void
}

export default function SaveQuickLinkCommand({
    setIsCommandOpen,
}: SaveQuickLinkCommandProps) {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const currentUrl = location.href.toString()

    const { data: quickLinks } = useQuery({
        queryKey: ["quicklinks"],
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

            queryClient.refetchQueries({ queryKey: ["quicklinks"] })

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

        setIsCommandOpen(false)
    }

    if (currentPageQuickLink) {
        return (
            <CommandItem onSelect={handleRemoveQuickLink}>
                ➖ Remove {icon} {name}
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

            queryClient.refetchQueries({ queryKey: ["quicklinks"] })

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

        setIsCommandOpen(false)
    }

    return (
        <CommandItem
            onSelect={handleSaveQuickLink}
            keywords={["save", "link", "pin"]}
        >
            ➕ Save {`${icon} ${name}`}
        </CommandItem>
    )
}
