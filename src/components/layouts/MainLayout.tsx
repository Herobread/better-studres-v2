interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="mx-auto grid w-full max-w-3xl gap-4 px-3 py-7">
            {children}
        </div>
    )
}
