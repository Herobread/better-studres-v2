import {
    clearVersionTrackingData,
    getTrackedFileLinkMap,
    setTrackedFileLinkMap,
} from "@src/features/versionControl"
import { useToast } from "../../components/ui/use-toast"
import { CommandItem } from "../../components/ui/command"
import { ToastAction } from "../../components/ui/toast"

interface ClearVersionTrackingDataCommandProps {
    setIsCommandOpen: (open: boolean) => void
}

export default function ClearVersionTrackingDataCommand({
    setIsCommandOpen,
}: ClearVersionTrackingDataCommandProps) {
    const { toast } = useToast()

    const handleClearVersionTrackingData = async () => {
        try {
            const trackedFileLinkMap = await getTrackedFileLinkMap()

            await clearVersionTrackingData()

            const handleUndo = async () => {
                try {
                    await setTrackedFileLinkMap(trackedFileLinkMap)

                    toast({
                        title: "✅ Success",
                        description: "Version tracking data has been restored.",
                    })
                } catch (error) {
                    toast({
                        title: "❌ Error",
                        description: "Failed to restore version tracking data.",
                    })
                }
            }

            toast({
                title: "✅ Success",
                description: "Version tracking data has been cleared.",
                action: (
                    <ToastAction onClick={handleUndo} altText="Restore cache">
                        Undo
                    </ToastAction>
                ),
            })
        } catch (error) {
            toast({
                title: "❌ Error",
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
            keywords={["reset", "data", "vcs","version"]}
        >
            🗑️ Clear version tracking data
        </CommandItem>
    )
}
