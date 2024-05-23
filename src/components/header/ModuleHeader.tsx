import { getModuleEmoji } from "@src/content/enhancers/moduleEmoji/getModuleEmoji"
import generateVirtualPath from "@src/content/versionControl/generateVirtualPath"
import Title from "../typography/Title"

export default function ModuleHeader() {
    const currentUrl = location.href.toString()

    const virtualPath = generateVirtualPath(currentUrl)

    const moduleCode = virtualPath[0]

    const moduleEmoji = getModuleEmoji(moduleCode)

    return <Title>{moduleCode + " " + moduleEmoji}</Title>
}
