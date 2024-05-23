interface MainLayoutProps {
    children: React.ReactNode
}

export default function WideLayout({ children }: MainLayoutProps) {
    return (
        <div className="mx-auto grid w-full max-w-4xl gap-8 px-3">
            {children}
        </div>
    )
}
