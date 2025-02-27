import { zodResolver } from "@hookform/resolvers/zod"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import { extractUrlSegments } from "@src/features/files"
import {
    addQuickLink,
    GET_QUICK_LINKS_QUERY_KEY,
} from "@src/features/quickLinks"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CompactLayout from "../../../components/layouts/CompactLayout"
import NormalLayout from "../../../components/layouts/NormalLayout"
import H2 from "../../../components/typography/H2"
import { Button } from "../../../components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"

const allowedIconsRegex = /[\p{Emoji}\p{So}]/u

export const quickLinkFormSchema = z.object({
    icon: z.string().regex(allowedIconsRegex, "Invalid emoji"),
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

    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof quickLinkFormSchema>>({
        resolver: zodResolver(quickLinkFormSchema),
        defaultValues: {
            icon: moduleEmoji,
            name: decodeURI(name || ""),
            href,
        },
    })

    async function onSubmit(
        quickLinkData: z.infer<typeof quickLinkFormSchema>
    ) {
        await addQuickLink(quickLinkData)

        queryClient.invalidateQueries({ queryKey: [GET_QUICK_LINKS_QUERY_KEY] })
        queryClient.refetchQueries({ queryKey: [GET_QUICK_LINKS_QUERY_KEY] })

        if (afterSubmit) {
            afterSubmit()
        }
    }

    return (
        <NormalLayout>
            <H2>Pin Link</H2>
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
                        <Button type="submit">Pin</Button>
                    </NormalLayout>
                </form>
            </Form>
        </NormalLayout>
    )
}
