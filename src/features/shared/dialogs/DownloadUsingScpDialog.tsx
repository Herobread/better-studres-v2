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
import { CONFIG_FALLBACK, loadConfig, saveConfig } from "@src/features/config"
import { getOs } from "@src/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    username: z.string().min(1),
    source: z.string().min(1),
    target: z.string().min(1),
})

function getOsDownloadsPath() {
    const os = getOs()

    if (os === "windows") {
        return "%USERPROFILE%\\Downloads"
    }
    return "~/Downloads"
}

export default NiceModal.create(({ fileKey }: { fileKey: string }) => {
    const { toast } = useToast()
    let { data: config } = useQuery({
        queryKey: ["config"],
        queryFn: loadConfig,
    })
    const modalHandler = useModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: config?.username || "",
            source: "/cs/studres/" + fileKey,
            target: config?.downloadPathPreference || getOsDownloadsPath(),
        },
    })

    useEffect(() => {
        form.reset({
            username: config?.username || "",
            source: "/cs/studres/" + fileKey,
            target: config?.downloadPathPreference || getOsDownloadsPath(),
        })
    }, [fileKey, config?.username, form.reset])

    const onSubmit = async (commandData: z.infer<typeof formSchema>) => {
        try {
            const { username, source, target } = commandData

            if (!config) {
                config = CONFIG_FALLBACK
            }

            config.username = username
            config.downloadPathPreference = target
            await saveConfig(config)

            const command = `scp -r ${username}@${username}.teaching.cs.st-andrews.ac.uk:${source} ${target}`

            navigator.clipboard.writeText(command)

            toast({
                title: "✅ Success",
                description:
                    "Command copied. Paste, verify, and run in your terminal.",
            })
            modalHandler.hide()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                title: "❌ Error",
                description: error.message || "Failed to copy command",
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
                    <DialogTitle>SSH download using scp</DialogTitle>
                    <DialogDescription>
                        Generates SCP command that will copy target folder and
                        it{`'`}s contents into target path using ssh.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="source"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Source</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="/remote/path"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="ab123"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="target"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Target path</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            placeholder="/local/path"
                                        />
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
                            <Button type="submit">Copy command</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
})
