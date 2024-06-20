import Title from "@src/components/typography/Title"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import { extractUrlSegments } from "@src/features/versionControl"

export default function ModuleHeader() {
    const currentUrl = location.href.toString()

    const urlSegments = extractUrlSegments(currentUrl)

    const moduleCode = urlSegments[0]

    const moduleEmoji = getModuleEmoji(moduleCode)

    return <Title>{moduleCode + " " + moduleEmoji}</Title>
}
