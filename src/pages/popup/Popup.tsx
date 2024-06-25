import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@src/components/ui/select"
import { Button } from "@src/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@src/components/ui/form"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { Switch } from "@src/components/ui/switch"
import pkg from "@src/../package.json"
import { CONFIG_FALLBACK } from "@src/features/config/configFallback"
import { saveConfig } from "@src/features/config/saveConfig"
import { loadConfig } from "@src/features/config/loadConfig"
import ExtensionToggle from "@src/features/extensionToggle/ExtensionToggle"
import BlacklistToggle from "@src/features/extensionToggle/BlacklistToggle"
import "@src/assets/styles/css-reset.css"

const formSchema = z.object({
    date: z.enum(["full", "relative"]),
    fileIcons: z.enum(["emoji", "pictures"]),
    imagePreviewAsIcon: z.boolean(),
    imagePreviewOnHover: z.boolean(),
    showQuickLinks: z.boolean(),
    showCommandButton: z.boolean(),
})

export default function Popup() {
    const { data: config } = useQuery({
        queryKey: ["config"],
        queryFn: loadConfig,
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: CONFIG_FALLBACK,
    })

    const {
        reset,
        formState: { isDirty },
    } = form

    const isSubmitDisabled = !isDirty

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await saveConfig(values)

        reset(values)
    }

    useEffect(() => {
        if (config) {
            reset(config)
        }
    }, [config, reset])

    return (
        <body
            className="_tailwind_preflight_reset grid h-min gap-4 bg-background p-2 text-base text-foreground"
            id="__better_studres_theme_root"
        >
            <div className="flex items-center ">
                <div className="w-full space-y-1">
                    <h1 className="flex flex-grow items-baseline gap-1 text-xl font-bold">
                        Better studres
                        <span className="text-sm font-normal text-muted-foreground">
                            {pkg.version}
                        </span>
                    </h1>
                    <a
                        href="https://github.com/Herobread/better-studres-v2"
                        className="text-sm text-muted-foreground"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Contribute on GitHub
                    </a>
                </div>
                <BlacklistToggle />
                <ExtensionToggle />
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-3"
                >
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>📅 Date display:</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Date display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="relative">
                                            Relative (N days ago)
                                        </SelectItem>
                                        <SelectItem value="full">
                                            Full (YYYY-MM-DD HH:MM)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fileIcons"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>📁 File icons:</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="File icons" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="emoji">
                                            Emoji
                                        </SelectItem>
                                        <SelectItem value="pictures">
                                            Pictures
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imagePreviewAsIcon"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-1">
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>
                                        <p>Image as file icon</p>
                                        <p className="text-sm font-normal text-muted-foreground">
                                            Replaces icons of images with very
                                            small image preview
                                        </p>
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imagePreviewOnHover"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-1">
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>
                                        <p>Image preview on hover</p>
                                        <p className="text-sm font-normal text-muted-foreground">
                                            Shows preview of images without
                                            leaving studres
                                        </p>
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="showQuickLinks"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-1">
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>
                                        <p>Show quick links</p>
                                        <p className="text-sm font-normal text-muted-foreground">
                                            Quickly navigate between pages
                                        </p>
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="showCommandButton"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-1">
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>
                                        <p>Show commands button</p>
                                        <p className="text-sm font-normal text-muted-foreground">
                                            Commands still work, even if this is
                                            disabled
                                        </p>
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitDisabled}>
                        {isSubmitDisabled ? "Saved" : "Save"}
                    </Button>
                </form>
            </Form>
        </body>
    )
}
