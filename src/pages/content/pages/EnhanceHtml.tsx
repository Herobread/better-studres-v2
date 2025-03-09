import ShadowWrapper from "@src/components/layouts/ShadowWrapper"
import { ControlPanel } from "@src/features/enhanceHtml/ControlPanel"

export function EnhanceHtml() {
    return (
        <>
            <div className="h-10"></div>
            <ShadowWrapper>
                <ControlPanel />
            </ShadowWrapper>
        </>
    )
}
