import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent } from "@src/components/ui/dialog"
import { QuickLink } from "@src/types/quickLinkTypes"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CompactLayout from "../../components/layouts/CompactLayout"
import NormalLayout from "../../components/layouts/NormalLayout"
import H2 from "../../components/typography/H2"
import { Button } from "../../components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { updateQuickLink } from "../quickAccess"

const formSchema = z.object({
    icon: z.string().emoji().max(4, "4 emoji max"),
    name: z.string().min(1, "Name is required").max(50),
    href: z.string().min(1, "Link is required"),
})

export default NiceModal.create(({ quickLink }: { quickLink: QuickLink }) => {
    const modalHandler = useModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...quickLink,
        },
    })

    const queryClient = useQueryClient()

    async function onSubmit(quickLinkData: z.infer<typeof formSchema>) {
        await updateQuickLink(quickLink.id, quickLinkData)

        queryClient.invalidateQueries({ queryKey: ["quicklinks"] })
        queryClient.refetchQueries({ queryKey: ["quicklinks"] })

        modalHandler.hide()
    }

    return (
        <Dialog handler={modalHandler}>
            <DialogContent>
                <NormalLayout>
                    <H2>Update &quot;{quickLink.name}&quot;</H2>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="m-0"
                        >
                            <NormalLayout>
                                <CompactLayout>
                                    <div className="grid grid-cols-[60px_1fr] gap-2">
                                        <FormField
                                            control={form.control}
                                            name="icon"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Icon(s)
                                                        </FormLabel>
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
                                                            Name
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
                                    <FormField
                                        control={form.control}
                                        name="href"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel>Link</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            autoComplete="off"
                                                            placeholder="url"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </CompactLayout>
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                    <Button type="submit">Save</Button>
                                </div>
                            </NormalLayout>
                        </form>
                    </Form>
                </NormalLayout>
            </DialogContent>
        </Dialog>
    )
})
