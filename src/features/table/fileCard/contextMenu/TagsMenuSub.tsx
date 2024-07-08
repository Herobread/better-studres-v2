import NiceModal from "@ebay/nice-modal-react"
import {
    ContextMenuCheckboxItem,
    ContextMenuItem,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import { Separator } from "@src/components/ui/separator"
import {
    GET_FILE_TAGS_QUERY_KEY,
    TAGS_QUERY_KEY,
    Tag,
    getFileTags,
    getTags,
    toggleFileTag,
} from "@src/features/files/tags/storage"
import { FullFileLink } from "@src/features/parser"
import AddNewTagDialog from "@src/features/shared/dialogs/tags/AddNewTagDialog"
import ManageTagsDialog from "@src/features/shared/dialogs/tags/ManageTagsDialog"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TagsIcon } from "lucide-react"

interface TagsMenuSubProps {
    fileLink: FullFileLink
}

export function TagsMenuSub({ fileLink }: TagsMenuSubProps) {
    const { fileKey } = fileLink

    const { data: tags } = useQuery({
        queryKey: [TAGS_QUERY_KEY],
        queryFn: getTags,
    })

    const { data: currentTags } = useQuery({
        queryKey: [GET_FILE_TAGS_QUERY_KEY],
        queryFn: () => getFileTags(fileKey),
    })

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

                <TagsList
                    tags={tags}
                    appliedTags={currentTags}
                    fileKey={fileKey}
                />
            </ContextMenuSubContent>
        </ContextMenuSub>
    )
}

function TagsList({
    tags,
    appliedTags,
    fileKey,
}: {
    tags?: Tag[]
    appliedTags?: Tag[]
    fileKey: string
}) {
    const queryClient = useQueryClient()

    if (!tags || tags.length == 0) {
        return null
    }

    return (
        <>
            <Separator />
            {tags.map((tag) => {
                const isChecked = !!appliedTags?.find((tag_) => {
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
        </>
    )
}
