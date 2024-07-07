import { ContextMenuItem } from "@src/components/ui/context-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@src/components/ui/tooltip"
import { isUrlTracked } from "@src/features/files"
import { FullFileLink } from "@src/features/parser"
import { GitCompareArrowsIcon } from "lucide-react"

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
                    <UpdatesMenuItemContent fileLink={fileLink} />
                </TooltipTrigger>
                <TooltipContent>
                    Version tracking is disabled for archived years.
                </TooltipContent>
            </Tooltip>
        )
    }

    return <UpdatesMenuItemContent fileLink={fileLink} />
}

interface UpdatesMenuItemContentProps {
    fileLink: FullFileLink
}

function UpdatesMenuItemContent({ fileLink }: UpdatesMenuItemContentProps) {
    return (
        <ContextMenuItem>
            <GitCompareArrowsIcon /> View update history
        </ContextMenuItem>
    )
}
