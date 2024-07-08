import NiceModal from "@ebay/nice-modal-react"
import {
    ContextMenuCheckboxItem,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import AddNewTagDialog from "@src/features/dialogs/AddNewTagDialog"
import ManageTagsDialog from "@src/features/dialogs/ManageTagsDialog"
import {
    GET_FILE_TAGS_QUERY_KEY,
    TAGS_QUERY_KEY,
    getFileTags,
    getTags,
    toggleFileTag,
} from "@src/features/files/tags/storage"
import { FullFileLink } from "@src/features/parser"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TagsIcon } from "lucide-react"

interface TagsMenuItemProps {
    fileLink: FullFileLink
}

export function TagsMenuItem({ fileLink }: TagsMenuItemProps) {
    const { fileKey } = fileLink

    const { data: tags } = useQuery({
        queryKey: [TAGS_QUERY_KEY],
        queryFn: getTags,
    })

    const { data: currentTags } = useQuery({
        queryKey: [GET_FILE_TAGS_QUERY_KEY],
        queryFn: () => getFileTags(fileKey),
    })

    const queryClient = useQueryClient()

    const handleCreateNewTag = () => {
        NiceModal.show(AddNewTagDialog, { fileLink })
    }

    const handleManageTags = () => {
        NiceModal.show(ManageTagsDialog)
    }

    return (
        <ContextMenuSub>
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
                {tags && tags.length > 0 && <ContextMenuSeparator />}
                {tags &&
                    tags.map((tag) => {
                        const isChecked = !!currentTags?.find((tag_) => {
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
