interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="py-7 px-3 w-full grid gap-4 max-w-3xl mx-auto">
            {children}
        </div>
    )
}
