interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="pt-14 px-3 w-full grid gap-8 max-w-2xl mx-auto">
            {children}
        </div>
    )
}
