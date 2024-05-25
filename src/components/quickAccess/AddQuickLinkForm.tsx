import { z } from "zod"
import CompactLayout from "../layouts/CompactLayout"
import H2 from "../typography/H2"
import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import NormalLayout from "../layouts/NormalLayout"
import { addQuickLink } from "./QuickLinkManager"
import { getModuleEmoji } from "@src/content/enhancers/moduleEmoji/getModuleEmoji"
import extractUrlSegments from "@src/content/versionControl/urlSegments"

const formSchema = z.object({
    icon: z.string().emoji().max(4, "4 emoji max"),
    name: z.string().min(1, "Name is required").max(50),
    href: z.string().min(1, "Link is required"),
})

interface AddQuickLinkFormProps {
    name?: string
    href?: string
    afterSubmit?: () => void
}

export default function AddQuickLinkForm({
    href,
    name,
    afterSubmit,
}: AddQuickLinkFormProps) {
    const urlSegments = extractUrlSegments(href || "")
    const moduleCode = urlSegments[0]
    const moduleEmoji = getModuleEmoji(moduleCode)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            icon: moduleEmoji,
            name,
            href,
        },
    })

    async function onSubmit(quickLinkData: z.infer<typeof formSchema>) {
        await addQuickLink(quickLinkData)

        if (afterSubmit) {
            afterSubmit()
        }
    }

    return (
        <NormalLayout>
            <H2>Add quick link</H2>
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
                        <Button type="submit">Add</Button>
                    </NormalLayout>
                </form>
            </Form>
        </NormalLayout>
    )
}
