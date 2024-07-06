import {
    ContextMenuCheckboxItem,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import { generateFileLinkKey } from "@src/features/files"
import {
    TAGS_QUERY_KEY,
    Tag,
    getTags,
    toggleFileTag,
} from "@src/features/files/tags/storage"
import { FileLink } from "@src/types/pageContentTypes"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TagsIcon } from "lucide-react"
import { ComponentProps } from "react"

interface TagFileMenuContextItemProps
    extends ComponentProps<typeof ContextMenuSub> {
    setIsTagMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsManageTagsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    fileLink: FileLink
    fileTags: Tag[] | undefined
}

export function TagFileMenuContextItem({
    setIsTagMenuOpen,
    setIsManageTagsMenuOpen,
    fileLink,
    fileTags,
    ...props
}: TagFileMenuContextItemProps) {
    const fileKey = generateFileLinkKey(fileLink)
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

    // if (fileTags && fileTags?.length > 0) {
    //     const handleRemoveTag = async () => {
    //         await removeFileTag(fileKey, fileTags[0].id)
    //         queryClient.invalidateQueries({
    //             queryKey: [TAGS_QUERY_KEY, TAGS_QUERY_KEY + fileKey],
    //         })
    //         queryClient.refetchQueries({
    //             queryKey: [TAGS_QUERY_KEY, TAGS_QUERY_KEY + fileKey],
    //         })
    //     }

    //     return (
    //         <ContextMenuItem onSelect={handleRemoveTag}>
    //             <TicketMinusIcon /> Remove tag
    //         </ContextMenuItem>
    //     )
    // }

    const handleManageTags = () => {
        setIsManageTagsMenuOpen(true)
    }

    const handleCreateNewTag = () => {
        setIsTagMenuOpen(true)
        // queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_KEY] })
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
                <ContextMenuSeparator />
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
