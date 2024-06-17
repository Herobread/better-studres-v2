import { useQuery, useQueryClient } from "@tanstack/react-query"
import { addQuickLink, getQuickLinks } from "../quickAccess/QuickLinkManager"
import generateQuickLinkInfo from "../quickAccess/generateQuickLinkInfo"
import { CommandItem } from "../ui/command"
import { useToast } from "../ui/use-toast"

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

    const isPresent = quickLinks?.find((quickLink) => {
        if (quickLink.href === currentUrl) {
            return true
        }
    })

    if (isPresent) {
        return null
    }

    const { href, name, icon } = generateQuickLinkInfo(currentUrl)

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
