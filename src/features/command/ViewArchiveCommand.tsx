import NiceModal from "@ebay/nice-modal-react"
import { extractUrlSegments } from "@src/features/files"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import ViewArchiveDialog from "@src/features/shared/dialogs/ViewArchiveDialog"
import { CommandItem } from "../../components/ui/command"

const COMMAND_KEYWORDS = [
    "time",
    "travel",
    "archive",
    "previous",
    "go",
    "back",
    "go back",
    "history",
]

export default function ViewArchiveCommand() {
    const currentUrl = window.location.toString()
    const currentUrlSegments = extractUrlSegments(currentUrl)

    if (
        currentUrlSegments[0] === "_this_session" ||
        currentUrlSegments[0] === "icons"
    ) {
        return null
    }

    return <GoToArchiveCommand />
}

function GoToArchiveCommand() {
    const handleOpenArchive = () => {
        NiceModal.hide(CommandsDialog)
        NiceModal.show(ViewArchiveDialog)
    }

    return (
        <CommandItem onSelect={handleOpenArchive} keywords={COMMAND_KEYWORDS}>
            🕰️ Time travel
        </CommandItem>
    )
}
