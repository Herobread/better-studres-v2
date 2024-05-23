import { z } from "zod"
import NormalLayout from "../layouts/NormalLayout"
import H2 from "../typography/H2"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateQuickLink } from "./QuickLinkManager"
import CompactLayout from "../layouts/CompactLayout"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { QuickLink } from "@src/types/quickLinkTypes"

interface EditQuickLinkFormProps {
    quickLink: QuickLink
    afterSubmit?: () => void
}

const formSchema = z.object({
    icon: z.string().emoji().max(4, "4 emoji max"),
    name: z.string().min(1, "Name is required").max(50),
    href: z.string().min(1, "Link is required"),
})

export default function EditQuickLinkForm({
    quickLink,
    afterSubmit,
}: EditQuickLinkFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...quickLink,
        },
    })

    async function onSubmit(quickLinkData: z.infer<typeof formSchema>) {
        await updateQuickLink(quickLink.id, quickLinkData)

        if (afterSubmit) {
            afterSubmit()
        }
    }

    return (
        <NormalLayout>
            <H2>Update &quot;{quickLink.name}&quot;</H2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="m-0">
                    <NormalLayout>
                        <CompactLayout>
                            <div className="grid grid-cols-[60px_1fr] gap-2">
                                <FormField
                                    control={form.control}
                                    name="icon"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Icon(s)</FormLabel>
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
                                                <FormLabel>Name</FormLabel>
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
                        <Button type="submit">Save</Button>
                    </NormalLayout>
                </form>
            </Form>
        </NormalLayout>
    )
}
