import {
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import { UrlSegments } from "@src/features/files"
import { FullFileLink } from "@src/features/parser"
import CopyTextMenuItem from "@src/features/shared/contextMenuItems/CopyTextMenuItem"
import { CopyIcon, FileTextIcon, LinkIcon, TerminalIcon } from "lucide-react"

export function CopyMenuSub({ fileLink }: { fileLink: FullFileLink }) {
    return (
        <ContextMenuSub>
            <ContextMenuSubTrigger>
                <CopyIcon className="h-4 w-4" /> Copy
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="max-h-[300px] w-48 overflow-auto">
                <CopyTextMenuItem
                    icon={<LinkIcon className="h-4 w-4" />}
                    name="URL"
                    textToCopy={fileLink.href}
                />
                <CopyTextMenuItem
                    icon={<FileTextIcon className="h-4 w-4" />}
                    name="Name"
                    textToCopy={fileLink.fullName}
                />
                <CopyTextMenuItem
                    icon={<TerminalIcon className="h-4 w-4" />}
                    name="Path"
                    textToCopy={generateLabPcPath(fileLink.urlSegments)}
                />
            </ContextMenuSubContent>
        </ContextMenuSub>
    )
}

function generateLabPcPath(urlSegments: UrlSegments) {
    const isCurrentModuleRegex = /[A-Z]{2}\d{4}/

    if (isCurrentModuleRegex.test(urlSegments[0])) {
        return "/cs/studres/_this_session/" + urlSegments.join("/")
    }

    return "/cs/studres/" + urlSegments.join("/")
}
