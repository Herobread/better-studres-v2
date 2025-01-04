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
    GET_NOTE_QUERY_KEY,
    addNote,
    getNote,
} from "@src/features/note/noteManager"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    note: z.string().max(300),
})

export default NiceModal.create(({ fileKey }: { fileKey: string }) => {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const modalHandler = useModal()

    const { data: fileNote } = useQuery({
        queryKey: [GET_NOTE_QUERY_KEY, fileKey],
        queryFn: () => getNote(fileKey),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            note: fileNote?.text,
        },
    })

    useEffect(() => {
        form.reset({ note: fileNote?.text })
    }, [fileKey, form.reset])

    const onSubmit = async (noteData: z.infer<typeof formSchema>) => {
        try {
            await addNote(fileKey, { text: noteData.note })

            queryClient.invalidateQueries({
                queryKey: [GET_NOTE_QUERY_KEY, fileKey],
            })
            queryClient.refetchQueries({
                queryKey: [GET_NOTE_QUERY_KEY, fileKey],
            })

            modalHandler.hide()
        } catch (error: any) {
            toast({
                title: "❌ Error",
                description: error.message || "Failed to add note to the file.",
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
                    <DialogTitle>Add note</DialogTitle>
                    <DialogDescription>
                        Add additional information about the file
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Note text</FormLabel>
                                    <FormControl>
                                        <Input {...field} autoComplete="off" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="flex flex-col-reverse gap-1 sm:flex-row sm:justify-end sm:space-x-2">
                            <Button
                                variant={"outline"}
                                type="button"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Add note</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
})
