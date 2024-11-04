import H1 from "@src/components/typography/H1"
import { getFileEmoji } from "@src/features/contentEnhancers/emoji/files"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import { extractUrlSegments } from "@src/features/files"
import { ModuleHeaderWithSideText } from "@src/features/header/ModuleHeaderWithSideText"
import { getSegmentType } from "@src/features/router/getSegmentType"

export default function ModuleHeader() {
    const currentUrl = location.href.toString()

    const urlSegments = extractUrlSegments(currentUrl)

    const homePath = urlSegments[0]

    const isArchivedYear = getSegmentType(homePath) === "archive"

    if (isArchivedYear && !urlSegments[1]) {
        const archivedYear = urlSegments[0]

        return <H1>{`🗄️ ${archivedYear} archive`}</H1>
    }

    if (isArchivedYear && urlSegments[1]) {
        const archivedYear = urlSegments[0]
        const moduleCode = urlSegments[1]

        const header = `🗄️ ${moduleCode}`
        const subheader = `${archivedYear} archive`

        return <ModuleHeaderWithSideText sideText={subheader} title={header} />
    }

    if (
        getSegmentType(urlSegments[0]) !== "archive" &&
        urlSegments.length === 1
    ) {
        return <H1>{getModuleEmoji(homePath) + " " + homePath}</H1>
    }

    return (
        <ModuleHeaderWithSideText
            title={getFileEmoji(urlSegments[1] + "/") + " " + urlSegments[1]}
            sideText={homePath}
        />
    )
}
