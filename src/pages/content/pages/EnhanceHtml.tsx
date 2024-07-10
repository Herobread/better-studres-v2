import { ControlPanel } from "@src/features/enhanceHtml/ControlPanel"

export function EnhanceHtml() {
    return (
        <>
            <div className="h-10"></div>
            <div className="_tailwind_preflight_reset fixed bottom-5 right-5 transform text-base text-foreground">
                <ControlPanel />
            </div>
        </>
    )
}
