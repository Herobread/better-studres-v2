import { ButtonHTMLAttributes } from "react"

interface QuickLinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	content?: string
	icon: string
}

export default function QuickLinkButton({ content, icon, ...props }: QuickLinkButtonProps) {
	return <button {...props} className="flex gap-2 rounded-xl py-1 px-3 bg-primary-foreground hover:bg-accent cursor-pointer">
		<div className="text-base">
			{icon}
		</div>
		{content && <div>
			{content}
		</div>}
	</button>
}