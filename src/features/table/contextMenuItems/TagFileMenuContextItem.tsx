import { ContextMenuItem } from "@src/components/ui/context-menu"
import { generateFileLinkKey } from "@src/features/files"
import { FileLink } from "@src/types/pageContentTypes"
import { TagIcon } from "lucide-react"

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

    return (
        <ContextMenuItem
            onSelect={() => {
                setIsTagMenuOpen(true)
            }}
        >
            <TagIcon /> Add tag
        </ContextMenuItem>
    )
}
