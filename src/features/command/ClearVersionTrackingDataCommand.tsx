import NiceModal from "@ebay/nice-modal-react"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { useQueryClient } from "@tanstack/react-query"
import { CommandItem } from "../../components/ui/command"
import { ToastAction } from "../../components/ui/toast"
import { useToast } from "../../components/ui/use-toast"
import {
    GET_TRACKED_FILE_LINK_QUERY_KEY_BASE,
    clearVersionTrackingData,
    getFileDataMap,
    setFileDataMap,
} from "../files"

interface ClearVersionTrackingDataCommandProps {}

export default function ClearVersionTrackingDataCommand({}: ClearVersionTrackingDataCommandProps) {
    const { toast } = useToast()

    const queryClient = useQueryClient()

    const handleClearVersionTrackingData = async () => {
        try {
            const fileDataMapBackup = await getFileDataMap()

            await clearVersionTrackingData()

            const handleUndo = async () => {
                try {
                    await setFileDataMap(fileDataMapBackup)
                    queryClient.invalidateQueries({
                        queryKey: [GET_TRACKED_FILE_LINK_QUERY_KEY_BASE],
                    })
                    queryClient.refetchQueries({
                        queryKey: [GET_TRACKED_FILE_LINK_QUERY_KEY_BASE],
                    })
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

            queryClient.invalidateQueries({
                queryKey: [GET_TRACKED_FILE_LINK_QUERY_KEY_BASE],
            })
            queryClient.refetchQueries({
                queryKey: [GET_TRACKED_FILE_LINK_QUERY_KEY_BASE],
            })
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

        NiceModal.hide(CommandsDialog)
    }

    return (
        <CommandItem
            onSelect={handleClearVersionTrackingData}
            keywords={["reset", "data", "vcs", "version"]}
        >
            🗑️ Clear version tracking and file search data
        </CommandItem>
    )
}
