import {
    ContextMenuCheckboxItem,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import {
    TAGS_QUERY_KEY,
    Tag,
    getTags,
    toggleFileTag,
} from "@src/features/files/tags/storage"
import { FullFileLink } from "@src/features/parser"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TagsIcon } from "lucide-react"
import { ComponentProps } from "react"

interface TagFileMenuContextItemProps
    extends ComponentProps<typeof ContextMenuSub> {
    setIsTagMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsManageTagsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    fileLink: FullFileLink
    fileTags: Tag[] | undefined
}

export function TagFileMenuContextItem({
    setIsTagMenuOpen,
    setIsManageTagsMenuOpen,
    fileLink,
    fileTags,
    ...props
}: TagFileMenuContextItemProps) {
    const fileKey = fileLink.fileKey
    const queryClient = useQueryClient()

    const { data: allTags, isLoading } = useQuery({
        queryKey: [TAGS_QUERY_KEY],
        queryFn: getTags,
    })

    if (isLoading) {
        return (
            <ContextMenuSub {...props}>
                <ContextMenuSubTrigger disabled>
                    <TagsIcon /> Add tag
                </ContextMenuSubTrigger>
            </ContextMenuSub>
        )
    }

    const handleManageTags = () => {
        setIsManageTagsMenuOpen(true)
    }

    const handleCreateNewTag = () => {
        setIsTagMenuOpen(true)
    }

    return (
        <ContextMenuSub {...props}>
            <ContextMenuSubTrigger>
                <TagsIcon /> Tags
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="max-h-[300px] w-48 overflow-auto">
                <ContextMenuItem inset onSelect={handleCreateNewTag}>
                    Create new tag
                </ContextMenuItem>
                <ContextMenuItem inset onSelect={handleManageTags}>
                    Manage tags
                </ContextMenuItem>
                {allTags && allTags.length > 0 && <ContextMenuSeparator />}
                {allTags &&
                    allTags.map((tag) => {
                        const isChecked = !!fileTags?.find((tag_) => {
                            return tag_.id === tag.id
                        })

                        const { id, name } = tag

                        const handleToggleTag = async () => {
                            await toggleFileTag(fileKey, tag)

                            queryClient.invalidateQueries({
                                queryKey: [TAGS_QUERY_KEY],
                            })
                            queryClient.refetchQueries({
                                queryKey: [TAGS_QUERY_KEY],
                            })
                        }

                        return (
                            <ContextMenuCheckboxItem
                                checked={isChecked}
                                onSelect={handleToggleTag}
                                key={id}
                            >
                                {name}
                            </ContextMenuCheckboxItem>
                        )
                    })}
            </ContextMenuSubContent>
        </ContextMenuSub>
    )
}
