import H1 from "@src/components/typography/H1"

export function ModuleHeaderWithSideText({
    sideText,
    title,
}: {
    title: string
    sideText?: string
}) {
    if (!sideText) {
        return <H1>{title}</H1>
    }

    return (
        <div className="flex items-baseline gap-1">
            <H1>{title}</H1>
            <span className="text-sm text-muted-foreground">{sideText}</span>
        </div>
    )
}
