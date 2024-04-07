interface ListLayoutProps {
    children: React.ReactNode
}

export default function ListLayout({ children }: ListLayoutProps) {
    return <div className="grid gap-2">{children}</div>
}
