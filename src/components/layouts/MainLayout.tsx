interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="py-14 px-3 w-full grid gap-8 max-w-3xl mx-auto">
            {children}
        </div>
    )
}
