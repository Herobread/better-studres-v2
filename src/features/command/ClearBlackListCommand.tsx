import NiceModal from "@ebay/nice-modal-react"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { CommandItem } from "../../components/ui/command"
import { ToastAction } from "../../components/ui/toast"
import { useToast } from "../../components/ui/use-toast"
import { getBlackList, setBlackList } from "../extensionToggle/blacklist"

interface ClearBlackListCommandProps {}

export default function ClearBlackListCommand({}: ClearBlackListCommandProps) {
    const { toast } = useToast()

    const handleCommand = async () => {
        try {
            const blackList = await getBlackList()

            await setBlackList([])

            const handleUndo = async () => {
                try {
                    await setBlackList(blackList || [])

                    toast({
                        title: "✅ Success",
                        description: "Blacklist data has been restored.",
                    })
                } catch (error) {
                    toast({
                        title: "❌ Error",
                        description: "Failed to restore blacklist data.",
                    })
                }
            }

            toast({
                title: "✅ Success",
                description: "Blacklist data has been cleared.",
                action: (
                    <ToastAction
                        onClick={handleUndo}
                        altText="Restore blacklist"
                    >
                        Undo
                    </ToastAction>
                ),
            })
        } catch (error) {
            toast({
                title: "❌ Error",
                description:
                    "Failed to clear blacklist data. Please try again.",
            })
            console.error("Error clearing blacklist data:", error)
        }

        NiceModal.hide(CommandsDialog)
    }

    return (
        <CommandItem
            onSelect={handleCommand}
            keywords={["reset", "data", "blacklist", "whitelist"]}
        >
            🗑️ Clear blacklist
        </CommandItem>
    )
}
