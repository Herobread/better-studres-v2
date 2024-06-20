import H1 from "@src/components/typography/H1"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import { extractUrlSegments } from "@src/features/versionControl"

export default function ModuleHeader() {
    const currentUrl = location.href.toString()

    const urlSegments = extractUrlSegments(currentUrl)

    const moduleCode = urlSegments[0]

    const moduleEmoji = getModuleEmoji(moduleCode)

    return <H1>{moduleCode + " " + moduleEmoji}</H1>
}
