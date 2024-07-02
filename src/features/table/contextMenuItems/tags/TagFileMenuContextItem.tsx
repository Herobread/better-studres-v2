import {
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import { generateFileLinkKey } from "@src/features/files"
import {
    TAGS_QUERY_KEY,
    addTag,
    getTags,
} from "@src/features/files/tags/storage"
import { FileLink } from "@src/types/pageContentTypes"
import { useQuery, useQueryClient } from "@tanstack/react-query"
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
    const fileKey = generateFileLinkKey(fileLink)
    const queryClient = useQueryClient()

    const { data: tags } = useQuery({
        queryKey: [TAGS_QUERY_KEY],
        queryFn: getTags,
    })

    const handleCreateNewTag = () => {
        setIsTagMenuOpen(true)
        queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_KEY] })
    }

    return (
        <ContextMenuSub>
            <ContextMenuSubTrigger>
                <TagIcon /> Add tag
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
                {tags &&
                    tags.map((tag) => {
                        const { icon, id, name } = tag

                        const handleAddTag = async () => {
                            await addTag(fileKey, tag)
                            queryClient.invalidateQueries({
                                queryKey: [TAGS_QUERY_KEY],
                            })
                        }

                        return (
                            <TagContextMenuItem
                                onSelect={handleAddTag}
                                key={id}
                                icon={icon}
                                name={name}
                            />
                        )
                    })}
                <ContextMenuSeparator />
                <TagContextMenuItem
                    icon="➕"
                    name="New tag"
                    onSelect={handleCreateNewTag}
                />
                <TagContextMenuItem
                    icon="✏"
                    name="Edit tags"
                    onSelect={() => {}}
                />
            </ContextMenuSubContent>
        </ContextMenuSub>
    )
}
