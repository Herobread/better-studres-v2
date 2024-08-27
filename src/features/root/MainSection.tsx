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
import Link from "../router/Link"
import H3 from "@src/components/typography/H3"

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
            <H3>Postgraduate research students</H3>
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
                <H3>Taught students</H3>
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
                <H3>Miscellaneous</H3>
                <QuickLinkContainer>
                    <QuickLinkLink
                        quickLink={{
                            href: "https://studres.cs.st-andrews.ac.uk/Library",
                            icon: getModuleEmoji("library"),
                            id: 0,
                            name: "Library",
                        }}
                    />{" "}
                    - Local copies of books, software, websites, etc.
                </QuickLinkContainer>
                <QuickLinkContainer>
                    <QuickLinkLink
                        quickLink={{
                            href: "https://studres.cs.st-andrews.ac.uk/Timetables",
                            icon: getModuleEmoji("timetables"),
                            id: 0,
                            name: "Timetables",
                        }}
                    />{" "}
                    - Timetables for taught programmes.
                </QuickLinkContainer>
                
            </div>
            <div className="space-y-4">
                <H3>Modules</H3>
                {renderModules(content.modules)}
            </div>
            <div className="space-y-4">
                <H3>Sessions</H3>
                <QuickLinkContainer>
                    <Link
                        href="https://studres.cs.st-andrews.ac.uk/_this_session"
                        className="no-underline hover:underline"
                    >
                        This session
                    </Link>
                </QuickLinkContainer>

                <QuickLinkContainer>
                    {content.sessions.map((module, index) => (
                        <Link
                            key={index}
                            href={module.url}
                            className="no-underline hover:underline"
                        >
                            {module.code}
                        </Link>
                    ))}
                </QuickLinkContainer>
            </div>
        </div>
    )
}
