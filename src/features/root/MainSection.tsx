import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import { RootContent } from "@src/features/parser"
import {
    ModuleContent,
    ensureTrailingSlash,
} from "@src/features/parser/root/parseRootPageContent"
import { QuickLinkContainer } from "@src/features/quickLinks/components"
import { QuickLinkLink } from "@src/features/quickLinks/components/quickLink/QuickLinkLink"
import { MainSectionSkeleton } from "@src/features/root/MainSectionSkeleton"
import { useContext } from "react"
import { PageStateContext } from "../router/PageStateContext"

interface MainSectionProps {
    content: RootContent
}

export default function MainSection({ content }: MainSectionProps) {
    const { isLoading } = useContext(PageStateContext)

    if (isLoading) {
        return <MainSectionSkeleton />
    }

    const renderModules = (modulesGroups: ModuleContent[][]) => {
        return modulesGroups.map((modules, groupIndex) => (
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

                <div className="my-2 w-full"></div>
            </QuickLinkContainer>
        ))
    }

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-semibold">
                Postgraduate research students
            </h3>
            <QuickLinkContainer>
                <QuickLinkLink
                    quickLink={{
                        href: ensureTrailingSlash(
                            "https://studres.cs.st-andrews.ac.uk/PGR"
                        ),
                        icon: getModuleEmoji(
                            "Materials_relevant_to_PGR_students"
                        ),
                        id: 0,
                        name: "Materials relevant to PGR students",
                    }}
                />
            </QuickLinkContainer>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Taught students</h3>
                <p>Materials relevant to students on taught programmes.</p>

                <div className="flex gap-4">
                    <QuickLinkContainer>
                        {content.taught_students.map((module, index) => (
                            <QuickLinkLink
                                key={index}
                                quickLink={{
                                    href: module.url,
                                    icon: getModuleEmoji(
                                        module.url.split("/").pop() || ""
                                    ),
                                    id: index,
                                    name: module.code,
                                }}
                            />
                        ))}
                    </QuickLinkContainer>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Modules</h2>

                {renderModules(content.modules)}
            </div>
        </div>
    )
}
