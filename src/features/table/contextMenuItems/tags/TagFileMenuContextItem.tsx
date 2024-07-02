import {
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import { generateFileLinkKey } from "@src/features/files"
import { FileLink } from "@src/types/pageContentTypes"
import { TagIcon } from "lucide-react"
import { TagContextMenuItem } from "./TagContextMenuItem"

interface TagFileMenuContextItemProps {
    setIsTagMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    fileLink: FileLink
}

export function TagFileMenuContextItem({
    setIsTagMenuOpen,
    fileLink,
}: TagFileMenuContextItemProps) {
    const { href } = fileLink

    const fileKey = generateFileLinkKey(fileLink)

    const handleCreateNewTag = () => {
        setIsTagMenuOpen(true)
    }

    return (
        <ContextMenuSub>
            <ContextMenuSubTrigger>
                <TagIcon /> Add tag
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
                <TagContextMenuItem icon="📜" name="todo" />
                <TagContextMenuItem
                    icon="❗️"
                    name="important"
                    onSelect={() => {}}
                />
                <TagContextMenuItem
                    icon="➕"
                    name="new tag"
                    onSelect={handleCreateNewTag}
                />
            </ContextMenuSubContent>
        </ContextMenuSub>
    )
}
