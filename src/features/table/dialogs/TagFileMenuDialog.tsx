import { zodResolver } from "@hookform/resolvers/zod"
import CompactLayout from "@src/components/layouts/CompactLayout"
import H2 from "@src/components/typography/H2"
import { Button } from "@src/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@src/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@src/components/ui/form"
import { Input } from "@src/components/ui/input"
import { generateFileLinkKey } from "@src/features/files"
import {
    TAGS_QUERY_KEY,
    addTag,
    createTag,
} from "@src/features/files/tags/storage"
import { FileLink } from "@src/types/pageContentTypes"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface TagFileMenuDialogProps {
    open: boolean
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
    fileLink: FileLink
}

const formSchema = z.object({
    icon: z
        .string()
        .emoji()
        .refine((value) => [...value].length === 1, "1 emoji max"),
    name: z.string().min(1, "Name is required").max(50),
})

export function TagFileMenuDialog({
    open,
    onOpenChange,
    fileLink,
}: TagFileMenuDialogProps) {
    const { fullName } = fileLink

    const queryClient = useQueryClient()

    const fileKey = generateFileLinkKey(fileLink)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            icon: "🔴",
        },
    })

    async function onSubmit(tagData: z.infer<typeof formSchema>) {
        const { icon, name } = tagData

        const tag = await createTag(icon, name)

        await addTag(fileKey, tag)
        queryClient.invalidateQueries({
            queryKey: [TAGS_QUERY_KEY, TAGS_QUERY_KEY + fileKey],
        })
        queryClient.refetchQueries({
            queryKey: [TAGS_QUERY_KEY, TAGS_QUERY_KEY + fileKey],
        })

        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Add new tag</DialogTitle>
                <DialogContent>
                    <H2>Add new tag to {`"${fullName}"`}</H2>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
                            <CompactLayout>
                                <div className="grid grid-cols-[60px_1fr] gap-2">
                                    <FormField
                                        control={form.control}
                                        name="icon"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel>Emoji</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            autoComplete="off"
                                                            placeholder="icon"
                                                            className="text-center"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tag name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            autoComplete="off"
                                                            placeholder="name"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>
                            </CompactLayout>
                            <div className="flex justify-end">
                                <Button type="submit">Add</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </DialogContent>
        </Dialog>
    )
}
