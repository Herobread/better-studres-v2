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
    fileLink: FullFileLink
}

const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(50),
})

export default NiceModal.create(({ fileLink }: TagFileMenuDialogProps) => {
    const { fullName, fileKey } = fileLink

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

            await addTag(fileKey, tag)

            queryClient.invalidateQueries({
                queryKey: [TAGS_QUERY_KEY, fileKey],
            })
            queryClient.refetchQueries({
                queryKey: [TAGS_QUERY_KEY, fileKey],
            })

            handleClose()

            toast({
                title: "✅ Success",
                description: `Added ${name} to ${fullName}.`,
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
                        Enter a tag name to add a new tag to {`"${fullName}"`}.
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
                                            placeholder="e.g., important, todo, c++"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                            <Button
                                type="button"
                                variant={"outline"}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Add Tag</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
})
