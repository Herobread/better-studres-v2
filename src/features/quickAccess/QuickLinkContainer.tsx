interface QuickLinkContainerProps {
    children: React.ReactNode
}

export function QuickLinkContainer({ children }: QuickLinkContainerProps) {
    return <div className="flex flex-wrap gap-3">{children}</div>
}
