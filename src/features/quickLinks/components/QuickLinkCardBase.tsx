import { QuickLink } from "@src/types/quickLinkTypes"

interface QuickLinkCardBaseProps {
    quickLink: QuickLink
}

export function QuickLinkCardBase({ quickLink }: QuickLinkCardBaseProps) {
    const { name, icon } = quickLink

    return (
        <div className="flex cursor-pointer gap-2 rounded-xl bg-background-layer-1 px-3 py-1 hover:bg-accent">
            <div className="text-base">{icon}</div>
            <div>{name}</div>
        </div>
    )
}
