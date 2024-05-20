import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@src/components/ui/select';
import '../shared-styles/style.css'
import { Toggle } from "@src/components/ui/toggle";
import { PowerCircleIcon } from "lucide-react";
import { Button } from '@src/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form';
import { saveConfig } from '@src/lib/storage/saveConfig';
import { loadConfig } from '@src/lib/storage/loadConfig';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const formSchema = z.object({
    date: z.enum(['raw', 'relative']),
    fileIcons: z.enum(['emoji', 'pictures'])
})

export default function Popup() {
    const { data: config } = useQuery({
        queryKey: ['config'],
        queryFn: loadConfig
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: 'relative',
            fileIcons: 'emoji'
        },
    })

    const { reset, formState: { isDirty } } = form;

    const isSubmitDisabled = !isDirty

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await saveConfig(values)

        reset(values) // make isDirty = false
    }

    useEffect(() => {
        if (config) {
            reset(config);
        }
    }, [config, reset]);

    return (
        <body className="_tailwind_preflight_reset p-1 text-base grid gap-4 h-min">
            <div className="flex items-center ">
                <h1 className="text-xl font-bold flex-grow">Better studres</h1>
                <Toggle>
                    <PowerCircleIcon />
                </Toggle>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-3'>
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>📅 Date display:</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Date display' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='relative'>Relative (4 months ago)</SelectItem>
                                        <SelectItem value='raw'>Raw (2024-01-17 16:37)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='fileIcons'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>📁 File icons:</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='File icons' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='emoji'>Emoji</SelectItem>
                                        <SelectItem value='pictures'>Pictures</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' disabled={isSubmitDisabled}>
                        {isSubmitDisabled ? 'Saved' : 'Save'}
                    </Button>
                </form>
            </Form>

        </body>
    )
}
