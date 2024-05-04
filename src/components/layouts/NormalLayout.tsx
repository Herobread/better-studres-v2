interface NormalLayoutProps {
	children: React.ReactNode
}

export default function NormalLayout({ children }: NormalLayoutProps) {
	return <div className="grid gap-3">{children}</div>
}
