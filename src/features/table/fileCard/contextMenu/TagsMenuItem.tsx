import {
    ContextMenuItem,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import { TagsIcon } from "lucide-react"

interface TagsMenuItemProps {}

export function TagsMenuItem({}: TagsMenuItemProps) {
    const throwError = () => {
        throw new Error("not implemented")
    }

    return (
        <ContextMenuSub>
            <ContextMenuSubTrigger>
                <TagsIcon /> Tags
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="max-h-[300px] w-48 overflow-auto">
                <ContextMenuItem inset onSelect={throwError}>
                    Create new tag
                </ContextMenuItem>
                <ContextMenuItem inset onSelect={throwError}>
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
