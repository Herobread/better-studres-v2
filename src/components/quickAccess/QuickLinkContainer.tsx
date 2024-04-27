interface QuickLinkContainerProps {
	children: React.ReactNode
}

export default function QuickLinkContainer({ children }: QuickLinkContainerProps) {
	return <div className="flex gap-3">{children}</div>
}