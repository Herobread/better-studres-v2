import ShadowWrapper from "@src/components/layouts/ShadowWrapper"
import { ControlPanel } from "@src/features/enhanceHtml/ControlPanel"

export function EnhanceHtml() {
    return (
        <>
            <div className="m-0 h-16 p-0"></div>
            <ShadowWrapper>
                <ControlPanel />
            </ShadowWrapper>
        </>
    )
}
