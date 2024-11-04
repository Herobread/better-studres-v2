import NiceModal from "@ebay/nice-modal-react"
import {
    convertUrlSegmentsToUrl,
    extractUrlSegments,
} from "@src/features/files"
import { getSegmentType } from "@src/features/router/getSegmentType"
import useSmoothRouter from "@src/features/router/useSmoothRouter"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import ViewArchiveDialog from "@src/features/shared/dialogs/ViewArchiveDialog"
import { CommandItem } from "../../components/ui/command"

const COMMAND_KEYWORDS = [
    "time",
    "travel",
    "archive",
    "back",
    "previous",
    "go",
    "history",
]

export default function ViewArchiveCommand() {
    const currentUrl = window.location.toString()
    const currentUrlSegments = extractUrlSegments(currentUrl)

    if (
        currentUrlSegments[0] &&
        getSegmentType(currentUrlSegments[0]) === "archive"
    ) {
        return <GoToPresentCommand />
    }

    return <GoToArchiveCommand />
}

function GoToPresentCommand() {
    const { navigateToPage } = useSmoothRouter()

    const currentUrl = window.location.toString()
    const currentUrlSegments = extractUrlSegments(currentUrl)

    const handleGoToPresent = () => {
        currentUrlSegments.splice(0, 1)
        navigateToPage(convertUrlSegmentsToUrl(currentUrlSegments))

        NiceModal.hide(CommandsDialog)
    }

    return (
        <CommandItem onSelect={handleGoToPresent} keywords={COMMAND_KEYWORDS}>
            🕰️ View current folder in the present
        </CommandItem>
    )
}

function GoToArchiveCommand() {
    const handleOpenArchive = () => {
        NiceModal.hide(CommandsDialog)
        NiceModal.show(ViewArchiveDialog)
    }

    return (
        <CommandItem onSelect={handleOpenArchive} keywords={COMMAND_KEYWORDS}>
            🕰️ View current folder in the past
        </CommandItem>
    )
}
