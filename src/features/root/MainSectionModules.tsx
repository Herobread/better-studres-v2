import { Separator } from "@src/components/ui/separator"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import { ModuleContent } from "@src/features/parser/root/parseRootPageContent"
import { QuickLinkContainer } from "@src/features/quickLinks/components"
import { QuickLinkLink } from "@src/features/quickLinks/components/quickLink/QuickLinkLink"

interface MainSectionModulesProps {
    modulesGroups: ModuleContent[][]
}

export default function MainSectionModules({
    modulesGroups,
}: MainSectionModulesProps) {
    return (
        <>
            {modulesGroups.map((modules, groupIndex) => {
                const isLast = groupIndex === modulesGroups.length - 1
                return (
                    <>
                        <QuickLinkContainer key={groupIndex}>
                            {modules.map((module, index) => (
                                <QuickLinkLink
                                    key={index}
                                    quickLink={{
                                        href: module.url,
                                        icon: getModuleEmoji(module.code),
                                        id: index,
                                        name: module.code,
                                    }}
                                />
                            ))}
                        </QuickLinkContainer>
                        {!isLast && <Separator />}
                    </>
                )
            })}
        </>
    )
}
