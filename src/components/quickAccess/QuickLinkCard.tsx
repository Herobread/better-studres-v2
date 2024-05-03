import { QuickLink } from "@src/types/pageContentTypes"

interface QuickLinkCardProps {
	quickLink: QuickLink
}

export default function QuickLinkCard({ quickLink }: QuickLinkCardProps) {
	const { href, name } = quickLink

	return <a href={href} className="flex gap-2 rounded-xl py-1 px-3 bg-primary-foreground hover:bg-accent cursor-pointer">
		<div className="text-base">
			📁
		</div>
		<div>
			{name}
		</div>
	</a>
}