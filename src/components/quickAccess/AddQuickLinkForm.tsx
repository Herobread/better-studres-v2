import { z } from "zod"
import CompactLayout from "../layouts/CompactLayout"
import H2 from "../typography/H2"
import { Button } from "../ui/button"
import { Form, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
	icon: z.string().emoji().max(2),
	name: z.string().max(50),
	href: z.string().min(1)
})

interface AddQuickLinkFormProps {
	name?: string
	href?: string
}

export default function AddQuickLinkForm({ href, name }: AddQuickLinkFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			icon: '📁',
			name,
			href
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	return <CompactLayout>
		<CompactLayout>
			<H2>Add quick link</H2>
			{/* <p>For emoji press Win + . or ctrl + . on linux or ctrl + cmd + space on mac</p> */}
		</CompactLayout>
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<CompactLayout>
					<div className="grid grid-cols-[50px_1fr] gap-2">
						<FormField
							control={form.control}
							name="icon"
							render={({ field }) => {
								return <Input placeholder="name" className="text-center" {...field} />
							}}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => {
								return <Input placeholder="name" defaultValue={name} {...field} />
							}}
						/>
					</div>
					<FormField
						control={form.control}
						name='href'
						render={({ field }) => {
							return <Input placeholder="url" defaultValue={href} {...field} />
						}}
					/>
					<Button type="submit">Save</Button>
				</CompactLayout>
			</form>
		</Form>
	</CompactLayout>
}