import ShadowWrapper from "@src/components/layouts/ShadowWrapper"
import { EnhanceHtmlToolbar } from "@src/features/enhanceHtml/EnhanceHtmlToolbar"

export function EnhanceHtml() {
    return (
        <>
            <div className="m-0 h-16 p-0"></div>
            <ShadowWrapper>
                <EnhanceHtmlToolbar />
            </ShadowWrapper>
        </>
    )
}
