import NiceModal from "@ebay/nice-modal-react"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { useEffect } from "react"

export function CommandsShortcutMount() {
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                NiceModal.show(CommandsDialog)
            }
        }

        document.addEventListener("keydown", down)

        return () => document.removeEventListener("keydown", down)
    }, [])

    return null
}
