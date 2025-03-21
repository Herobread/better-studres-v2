import H3 from "@src/components/typography/H3"
import { PremiumMessage } from "@src/features/easterEgg/PremiumMessage"
import { RootContent } from "@src/features/parser"
import { QuickLinkContainer } from "@src/features/quickLinks/components"
import { QuickLinkLink } from "@src/features/quickLinks/components/quickLink/QuickLinkLink"
import { MainSectionSkeleton } from "@src/features/root/MainSectionSkeleton"
import { useContext } from "react"
import { getModuleEmoji } from "../contentEnhancers/emoji/modules"
import Link from "../router/Link"
import { PageStateContext } from "../router/PageStateContext"
import MainSectionModules from "./MainSectionModules"

interface MainSectionProps {
    content: RootContent
}

export default function MainSection({ content }: MainSectionProps) {
    const { isLoading } = useContext(PageStateContext)

    if (isLoading) {
        return <MainSectionSkeleton />
    }

    return (
        <div className="space-y-6">
            <PremiumMessage />

            <div className="space-y-2">
                <H3>Postgraduate research students</H3>
                <QuickLinkContainer>
                    <QuickLinkLink
                        id="main-content"
                        quickLink={{
                            href: "https://studres.cs.st-andrews.ac.uk/PGR/",
                            icon: getModuleEmoji(
                                "Materials_relevant_to_PGR_students"
                            ),
                            id: 0,
                            name: "Materials relevant to PGR students",
                        }}
                    />
                </QuickLinkContainer>
            </div>

            <div className="space-y-2">
                <H3>Taught students</H3>
                <p>Materials relevant to students on taught programmes.</p>
                <QuickLinkContainer>
                    {content.taughtStudents.map((module, index) => (
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
            </div>

            <div className="space-y-2">
                <H3>Miscellaneous</H3>
                <p>
                    <Link
                        href="https://studres.cs.st-andrews.ac.uk/Library/"
                        className="underline"
                    >
                        Library
                    </Link>{" "}
                    - Local copies of books, software, websites, etc.
                </p>
                <p>
                    <Link
                        href="https://studres.cs.st-andrews.ac.uk/Timetables/"
                        className="underline"
                    >
                        Timetables
                    </Link>{" "}
                    - Timetables for taught programmes.
                </p>
            </div>

            <div className="space-y-2">
                <H3>Modules</H3>
                <p>Directories containing materials for each module.</p>
            </div>

            <div className="space-y-4">
                <MainSectionModules modulesGroups={content.modules} />
            </div>

            <H3>Sessions</H3>
            <div className="space-y-2">
                <Link
                    href="https://studres.cs.st-andrews.ac.uk/_this_session/"
                    className="no-underline hover:underline"
                >
                    This session
                </Link>
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
