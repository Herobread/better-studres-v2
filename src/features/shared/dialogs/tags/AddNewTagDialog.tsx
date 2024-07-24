import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@src/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@src/components/ui/dialog"
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
    addTag,
    createTag,
} from "@src/features/files/tags/storage"
import { FullFileLink } from "@src/features/parser"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface TagFileMenuDialogProps {
    fileLink?: FullFileLink
}

const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(50),
})

export default NiceModal.create(({ fileLink }: TagFileMenuDialogProps) => {
    const isAddToFileLink = !!fileLink

    // const { fullName, fileKey } = fileLink

    const modalHandler = useModal()
    const { toast } = useToast()

    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(tagData: z.infer<typeof formSchema>) {
        const { name } = tagData

        try {
            const tag = await createTag(name)

            if (isAddToFileLink) {
                await addTag(fileLink.fileKey, tag)
            }

            queryClient.invalidateQueries({
                queryKey: [TAGS_QUERY_KEY, fileLink?.fileKey],
            })
            queryClient.refetchQueries({
                queryKey: [TAGS_QUERY_KEY, fileLink?.fileKey],
            })

            handleClose()

            const description = isAddToFileLink
                ? `Created new tag: ${name} and added to ${fileLink.fullName}.`
                : `Created new tag: ${name}`

            toast({
                title: "✅ Success",
                description,
            })
        } catch (error) {
            toast({
                title: "❌ Error",
                description: `${error}`,
            })
        }
    }

    const handleClose = () => {
        form.reset()
        modalHandler.hide()
    }

    return (
        <Dialog handler={modalHandler}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Tag</DialogTitle>
                    <DialogDescription>
                        {isAddToFileLink
                            ? `Enter a tag name to add a new tag to "${fileLink.fullName}".`
                            : "Enter a name to create a new tag."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tag Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="off"
                                            placeholder="e.g., Important, Todo, C++"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="flex flex-col-reverse gap-1 sm:flex-row sm:justify-end sm:space-x-2">
                            <Button
                                type="button"
                                variant={"outline"}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isAddToFileLink
                                    ? `Create and add tag`
                                    : `Create tag`}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
})
