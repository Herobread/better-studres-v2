import { Badge } from "@src/components/ui/badge"
import { TAGS_QUERY_KEY, getFileTags } from "@src/features/files/tags/storage"
import { FullFileLink } from "@src/features/parser"
import { useQuery } from "@tanstack/react-query"

interface FileTagsProps {
    fileLink: FullFileLink
}

export function FileTags({ fileLink }: FileTagsProps) {
    const { fileKey } = fileLink

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

                            throw new Error("tag click")
                            // setIsViewTaggedFilesDialogOpen(
                            //     true
                            // )
                            // setActiveTag(tag)
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
