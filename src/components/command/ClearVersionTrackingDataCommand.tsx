import { clearVersionTrackingData } from "@src/content/versionControl"
import { useToast } from "../ui/use-toast"
import { CommandItem } from "../ui/command"

interface ClearVersionTrackingDataCommandProps {
    setIsCommandOpen: (open: boolean) => void
}

export default function ClearVersionTrackingDataCommand({
    setIsCommandOpen,
}: ClearVersionTrackingDataCommandProps) {
    const { toast } = useToast()

    const handleClearVersionTrackingData = async () => {
        try {
            await clearVersionTrackingData()
            toast({
                title: "Success",
                description:
                    "Version tracking data has been successfully cleared.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description:
                    "Failed to clear version tracking data. Please try again.",
            })
            console.error("Error clearing version tracking data:", error)
        }

        setIsCommandOpen(false)
    }

    return (
        <CommandItem
            onSelect={handleClearVersionTrackingData}
            keywords={["reset", "data"]}
        >
            🗑️ Clear version tracking data
        </CommandItem>
    )
}
