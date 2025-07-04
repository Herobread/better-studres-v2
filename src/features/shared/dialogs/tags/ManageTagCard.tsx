import NiceModal from "@ebay/nice-modal-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Badge } from "@src/components/ui/badge"
import { Button } from "@src/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@src/components/ui/form"
import { Input } from "@src/components/ui/input"
import { useToast } from "@src/components/ui/use-toast"
import {
    TAGS_QUERY_KEY,
    Tag,
    deleteTag,
    updateTagName,
} from "@src/features/files/tags/storage"
import { useQueryClient } from "@tanstack/react-query"
import { EditIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import ManageTagsDialog from "./ManageTagsDialog"
import ViewTaggedFilesDialog from "./ViewTaggedFilesDialog"

interface ManageTagCardProps {
    tag: Tag
    files?: number
}

const formSchema = z.object({
    tagName: z.string(),
})

export function ManageTagCard({ tag, files }: ManageTagCardProps) {
    const { id, name } = tag

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const queryClient = useQueryClient()

    async function onSubmitNewTagName(values: z.infer<typeof formSchema>) {
        const newTagName = values.tagName
        try {
            await updateTagName(id, newTagName)
            queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_KEY] })
            queryClient.refetchQueries({ queryKey: [TAGS_QUERY_KEY] })
            setIsEditing(false)
        } catch (error) {
            toast({
                title: "❌ Error",
                description: "Failed to rename tag.",
            })
        }
    }

    const [isEditing, setIsEditing] = useState(false)

    const handleCancelEditing = () => {
        setIsEditing(false)
    }

    const handleOpenFilePreviews = () => {
        NiceModal.hide(ManageTagsDialog)
        NiceModal.show(ViewTaggedFilesDialog, { tag })
    }

    files ??= 0

    let fileUsageDescription = "-"

    if (files === 1) {
        fileUsageDescription = `${files} file`
    } else if (files > 1) {
        fileUsageDescription = `${files} files`
    }

    if (isEditing) {
        return (
            <div className="rounded-xl bg-background-layer-1 p-3">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitNewTagName)}
                        className="space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="tagName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New tag name</FormLabel>
                                    <FormControl>
                                        <Input placeholder={name} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col-reverse gap-1 sm:flex-row sm:justify-end sm:space-x-2">
                            <Button
                                type="button"
                                variant={"outline"}
                                onClick={handleCancelEditing}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Update</Button>
                        </div>
                    </form>
                </Form>
            </div>
        )
    }

    const handleDeleteTag = async () => {
        try {
            await deleteTag(id)
            queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_KEY] })
            queryClient.refetchQueries({ queryKey: [TAGS_QUERY_KEY] })
        } catch (error) {
            toast({
                title: "❌ Error",
                description: "Failed to delete tag.",
            })
        }
    }

    return (
        <div
            className="group grid w-full grid-cols-[1fr_max-content_1fr] items-center gap-2 pr-[10px]"
            key={id}
        >
            <div>
                <Badge>{name}</Badge>
            </div>
            <button
                onClick={handleOpenFilePreviews}
                className="text-muted-foreground"
            >
                {fileUsageDescription}
            </button>
            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100">
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                        setIsEditing((isEditing) => !isEditing)
                    }}
                >
                    <EditIcon size={20} />
                </Button>
                <Button
                    variant={"destructiveGhost"}
                    size={"icon"}
                    onClick={handleDeleteTag}
                >
                    <Trash2Icon size={20} />
                </Button>
            </div>
        </div>
    )
}
