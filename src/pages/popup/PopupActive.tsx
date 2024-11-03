import { zodResolver } from "@hookform/resolvers/zod"
import pkg from "@src/../package.json"
import "@src/assets/styles/css-reset.css"
import { Button } from "@src/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@src/components/ui/form"
import { Switch } from "@src/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@src/components/ui/toggle-group"
import { CONFIG_FALLBACK } from "@src/features/config/configFallback"
import { loadConfig } from "@src/features/config/loadConfig"
import { saveConfig } from "@src/features/config/saveConfig"
import BlacklistToggle from "@src/features/extensionToggle/BlacklistToggle"
import ExtensionToggle from "@src/features/extensionToggle/ExtensionToggle"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    date: z.enum(["full", "relative"]),
    fileIcons: z.enum(["emoji", "pictures"]),
    imagePreviewAsIcon: z.boolean(),
    imagePreviewOnHover: z.boolean(),
    showQuickLinks: z.boolean(),
    showCommandButton: z.boolean(),
})

export default function PopupActive() {
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
        await saveConfig({ ...config, ...values })

        reset(values)
    }

    useEffect(() => {
        if (config) {
            reset(config)
        }
    }, [config, reset])

    return (
        <body className="_tailwind_preflight_reset grid h-min gap-4 bg-background p-2 text-base text-foreground">
            <div className="flex items-center ">
                <div className="w-full space-y-1">
                    <h1 className="flex flex-grow items-baseline gap-1 text-xl font-bold">
                        Better studres
                        <span className="text-sm font-normal text-muted-foreground">
                            {pkg.version}
                        </span>
                    </h1>
                    <div className="flex gap-1 text-sm text-muted-foreground">
                        <a
                            href="https://github.com/Herobread/better-studres-v2"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                        <span>·</span>
                        <a
                            href="https://forms.gle/769gnJuMzdSjgrZC7"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Send Feedback
                        </a>
                    </div>
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
                                <FormLabel>Date display:</FormLabel>
                                <FormControl>
                                    <ToggleGroup
                                        type="single"
                                        className="grid grid-cols-2"
                                        value={field.value}
                                        onValueChange={(value) => {
                                            if (value) {
                                                field.onChange(value)
                                            }
                                        }}
                                    >
                                        <ToggleGroupItem value="relative">
                                            ⏲️ Relative
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="full">
                                            📅 Full
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fileIcons"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>File icons:</FormLabel>
                                <FormControl>
                                    <ToggleGroup
                                        type="single"
                                        className="grid grid-cols-2"
                                        value={field.value}
                                        onValueChange={(value) => {
                                            if (value) {
                                                field.onChange(value)
                                            }
                                        }}
                                    >
                                        <ToggleGroupItem value="emoji">
                                            📁 Emoji
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="pictures">
                                            🖼️ Picture
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormLabel>Other view options:</FormLabel>
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
                                        <p>Show pinned links</p>
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
