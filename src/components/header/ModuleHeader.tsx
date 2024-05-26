import { getModuleEmoji } from "@src/content/enhancers/moduleEmoji/getModuleEmoji"
import Title from "../typography/Title"
import { extractUrlSegments } from "@src/content/versionControl"

export default function ModuleHeader() {
    const currentUrl = location.href.toString()

    const urlSegments = extractUrlSegments(currentUrl)

    const moduleCode = urlSegments[0]

    const moduleEmoji = getModuleEmoji(moduleCode)

    return <Title>{moduleCode + " " + moduleEmoji}</Title>
}
