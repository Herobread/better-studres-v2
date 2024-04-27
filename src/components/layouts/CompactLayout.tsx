interface CompactLayoutProps {
    children: React.ReactNode
}

export default function CompactLayout({ children }: CompactLayoutProps) {
    return <div className="grid gap-2">{children}</div>
}
