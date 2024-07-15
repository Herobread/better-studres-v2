import NiceModal from "@ebay/nice-modal-react"
import { ContextMenuItem } from "@src/components/ui/context-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@src/components/ui/tooltip"
import { isUrlTracked } from "@src/features/files"
import { FullFileLink } from "@src/features/parser"
import FileUpdatesDialog from "@src/features/shared/dialogs/FileUpdatesDialog"
import { GitCompareArrowsIcon } from "lucide-react"
import { ComponentProps } from "react"

interface UpdatesMenuItemProps {
    fileLink: FullFileLink
}

export function UpdatesMenuItem({ fileLink }: UpdatesMenuItemProps) {
    // const isVersionHistoryAvailable = isFileLinkTracked(fileLink)
    const isToolTipWhyDisabledShown = !isUrlTracked(fileLink.href)

    if (isToolTipWhyDisabledShown) {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <UpdatesMenuItemContent fileLink={fileLink} disabled />
                </TooltipTrigger>
                <TooltipContent>
                    Version tracking is disabled for archived years and
                    _this_session.
                </TooltipContent>
            </Tooltip>
        )
    }

    return <UpdatesMenuItemContent fileLink={fileLink} />
}

type UpdatesMenuItemContentProps = {
    fileLink: FullFileLink
}

function UpdatesMenuItemContent({
    fileLink,
    ...props
}: UpdatesMenuItemContentProps & ComponentProps<typeof ContextMenuItem>) {
    const handleSelect = () => {
        NiceModal.show(FileUpdatesDialog, { fileLink })
    }

    return (
        <ContextMenuItem {...props} onSelect={handleSelect}>
            <GitCompareArrowsIcon className="w-4 h-4" /> View update history
        </ContextMenuItem>
    )
}
