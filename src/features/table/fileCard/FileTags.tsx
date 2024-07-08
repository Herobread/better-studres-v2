import NiceModal from "@ebay/nice-modal-react"
import { Badge } from "@src/components/ui/badge"
import { TAGS_QUERY_KEY, getFileTags } from "@src/features/files/tags/storage"
import ViewTaggedFilesDialog from "@src/features/shared/dialogs/tags/ViewTaggedFilesDialog"
import { useQuery } from "@tanstack/react-query"

interface FileTagsProps {
    fileKey: string
}

export function FileTags({ fileKey }: FileTagsProps) {
    const { data: tags } = useQuery({
        queryKey: [TAGS_QUERY_KEY, fileKey],
        queryFn: async () => {
            return await getFileTags(fileKey)
        },
    })

    if (!tags) {
        return null
    }

    return (
        <>
            {tags.map((tag) => {
                return (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()

                            NiceModal.show(ViewTaggedFilesDialog, { tag })
                        }}
                        key={tag.id}
                    >
                        <Badge variant={"secondary"}>{tag.name}</Badge>
                    </button>
                )
            })}
        </>
    )
}
