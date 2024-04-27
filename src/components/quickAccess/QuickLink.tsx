interface QuickLinkProps {
	emoji?: string
	name: string
	href: string
}

export default function QuickLink({ href, name, emoji }: QuickLinkProps) {
	emoji ??= '📁'

	return <a href={href} className="flex gap-2 rounded-xl py-1 px-3 bg-primary-foreground hover:bg-accent cursor-pointer">
		<div className="text-base">
			{emoji}
		</div>
		<div>
			{name}
		</div>
	</a>
}