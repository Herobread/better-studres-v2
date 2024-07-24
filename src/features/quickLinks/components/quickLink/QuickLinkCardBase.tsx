export function QuickLinkCardBase({
    icon,
    name,
}: {
    name?: string
    icon: string
}) {
    return (
        <div className="flex cursor-pointer items-center gap-2 rounded-xl bg-background-layer-1 px-3 py-1 hover:bg-accent">
            <div>{icon}</div>
            <div>{name}</div>
        </div>
    )
}
