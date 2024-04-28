import { FileLink } from "@src/types/pageContentTypes"
import { Separator } from "../ui/separator"

interface FileCardProps {
	fileLink: FileLink
}

export default function FileCard({ fileLink }: FileCardProps) {
	const { description, href, lastModified, lastModifiedRelative, name, extension, space, emoji, image } = fileLink

	return <a href={href} className="grid p-3 gap-3 grid-cols-subgrid col-span-full bg-primary-foreground hover:bg-accent cursor-pointer rounded-xl items-center">
		<div className="w-full grid">
			<div className="text-center leading-5">{emoji}</div>
			{extension && <div className="font-mono text-center leading-5">{extension}</div>}
		</div>
		<Separator orientation="vertical" />
		<div className="grid items-center">
			<div className="font-bold">{name}</div>
			{description != null && <div className="italic">{description}</div>}
		</div>
		<div className="text-right">{space?.size.toFixed(1)}</div>
		<div className="ml-[-8px]">{space?.units}</div>
		<div className="text-right">{lastModifiedRelative}</div>
	</a>
}