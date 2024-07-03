import H2 from "@src/components/typography/H2"
import { Badge } from "@src/components/ui/badge"
import { Button } from "@src/components/ui/button"
import { Dialog, DialogContent } from "@src/components/ui/dialog"
import { ScrollArea } from "@src/components/ui/scroll-area"
import { Separator } from "@src/components/ui/separator"
import { TAGS_QUERY_KEY, getTags } from "@src/features/files/tags/storage"
import { useQuery } from "@tanstack/react-query"
import { EditIcon, Trash2Icon } from "lucide-react"

interface ManageTagsDialogProps {
    open: boolean
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export function ManageTagsDialog({
    onOpenChange,
    open,
}: ManageTagsDialogProps) {
    const { data: tags } = useQuery({
        queryKey: [TAGS_QUERY_KEY],
        queryFn: getTags,
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <H2>Manage tags</H2>
                <ScrollArea className="max-h-96">
                    {tags?.map((tag, i) => {
                        const { id, name } = tag

                        return (
                            <>
                                <div
                                    className="grid w-full grid-cols-[1fr_max-content_1fr] items-center gap-2"
                                    key={id}
                                >
                                    <div>
                                        <Badge>{name}</Badge>
                                    </div>
                                    <p className="text-muted-foreground">
                                        ? files
                                    </p>
                                    <div className="flex justify-end gap-1">
                                        <Button variant={"ghost"}>
                                            <EditIcon size={20} />
                                        </Button>
                                        <Button variant={"destructiveGhost"}>
                                            <Trash2Icon size={20} />
                                        </Button>
                                    </div>
                                </div>
                                {i < tags.length - 1 && <Separator />}
                            </>
                        )
                    })}
                </ScrollArea>
                <div className="flex justify-end">
                    <Button>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
