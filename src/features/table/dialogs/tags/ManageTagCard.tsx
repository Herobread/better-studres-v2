import { Badge } from "@src/components/ui/badge"
import { Button } from "@src/components/ui/button"
import { Tag } from "@src/features/files/tags/storage"
import { EditIcon, Trash2Icon } from "lucide-react"

interface ManageTagCardProps {
    tag: Tag
    files?: number
}

export function ManageTagCard({ tag, files }: ManageTagCardProps) {
    const { id, name } = tag

    files ??= 0

    let fileUsageDescription = "-"

    if (files === 1) {
        fileUsageDescription = `${files} file`
    } else if (files > 1) {
        fileUsageDescription = `${files} files`
    }

    return (
        <div
            className="group grid w-full grid-cols-[1fr_max-content_1fr] items-center gap-2 pr-[10px]"
            key={id}
        >
            <div>
                <Badge>{name}</Badge>
            </div>
            <p className="text-muted-foreground">{fileUsageDescription}</p>
            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100">
                <Button variant={"ghost"} size={"icon"}>
                    <EditIcon size={20} />
                </Button>
                <Button variant={"destructiveGhost"} size={"icon"}>
                    <Trash2Icon size={20} />
                </Button>
            </div>
        </div>
    )
}
