import H1 from "@src/components/typography/H1"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import { extractUrlSegments } from "@src/features/files"

export default function ModuleHeader() {
    const currentUrl = location.href.toString()

    const urlSegments = extractUrlSegments(currentUrl)

    const archivedYearRegex = /^\d{4}_\d{4}$/

    const homePath = urlSegments[0]

    const isArchivedYear = archivedYearRegex.test(homePath)

    if (isArchivedYear && !urlSegments[1]) {
        const archivedYear = urlSegments[0]

        return <H1>{`${archivedYear} 🗄️`}</H1>
    }

    if (isArchivedYear && urlSegments[1]) {
        const archivedYear = urlSegments[0]
        const moduleCode = urlSegments[1]

        return (
            <div className="flex items-baseline gap-1">
                <H1>{`${moduleCode} ${getModuleEmoji(moduleCode)}`}</H1>
                <span className="text-sm text-muted-foreground">
                    {archivedYear} archive
                </span>
            </div>
        )
    }

    return <H1>{homePath + " " + getModuleEmoji(homePath)}</H1>
}
