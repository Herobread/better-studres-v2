import { generateFileTitle } from "@src/features/head"
import { EnhanceHtmlToolbar } from "@src/features/tools/EnhanceHtmlToolbar"
import { FileBackButton } from "@src/features/tools/FileBackButton"
import { Helmet } from "react-helmet-async"

export function EnhanceHtml() {
    const url = location.href.toString()

    return (
        <>
            <Helmet>
                <title>{generateFileTitle(url)}</title>
            </Helmet>
            <FileBackButton />
            <EnhanceHtmlToolbar />
        </>
    )
}
