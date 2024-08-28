import H3 from "@src/components/typography/H3"
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
        <div className="space-y-4">
            <H3>Modules</H3>
            {modulesGroups.map((modules, groupIndex) => (
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
            ))}
        </div>
    )
}
