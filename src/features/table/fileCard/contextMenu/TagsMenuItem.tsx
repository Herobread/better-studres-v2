import NiceModal from "@ebay/nice-modal-react"
import {
    ContextMenuItem,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import AddNewTagDialog from "@src/features/dialogs/AddNewTagDialog"
import ManageTagsDialog from "@src/features/dialogs/ManageTagsDialog"
import { FullFileLink } from "@src/features/parser"
import { TagsIcon } from "lucide-react"

interface TagsMenuItemProps {
    fileLink: FullFileLink
}

export function TagsMenuItem({ fileLink }: TagsMenuItemProps) {
    const throwError = () => {
        throw new Error("not implemented")
    }

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
                {/* {allTags && allTags.length > 0 && <ContextMenuSeparator />}
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
                    })} */}
            </ContextMenuSubContent>
        </ContextMenuSub>
    )
}
