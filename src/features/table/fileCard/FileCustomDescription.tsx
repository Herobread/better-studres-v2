import { GET_NOTE_QUERY_KEY, getNote } from "@src/features/note/noteManager"
import { FileDescription } from "@src/features/table/fileCard/FileDescription"
import { useQuery } from "@tanstack/react-query"

interface FileCustomDescriptionProps {
    fileKey: string
}

export function FileCustomDescription({ fileKey }: FileCustomDescriptionProps) {
    const { data: noteData } = useQuery({
        queryKey: [GET_NOTE_QUERY_KEY, fileKey],
        queryFn: () => getNote(fileKey),
    })

    return <FileDescription description={noteData?.text} />
}
