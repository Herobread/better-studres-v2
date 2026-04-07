import NiceModal from "@ebay/nice-modal-react"
import MainLayout from "@src/components/layouts/MainLayout"
import WideLayout from "@src/components/layouts/WideLayout"
import H2 from "@src/components/typography/H2"
import { SkipToMainContent } from "@src/features/accessibility/SkipToMainContent"
import CommandInput from "@src/features/command/CommandInput"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { ConfigContext } from "@src/features/config"
import { getModuleEmoji } from "@src/features/contentEnhancers/emoji/modules"
import RootHeader from "@src/features/header/RootHeader"
import { RootContent } from "@src/features/parser"
import {
    ArchivedFolderItem,
    ModuleContent,
} from "@src/features/parser/root/parseRootPageContent"
import {
    AddQuickLinkButton,
    QuickLinkContainer,
    QuickLinkList,
} from "@src/features/quickLinks/components"
import { EmptyQuickLinksMessage } from "@src/features/quickLinks/components/EmptyQuickLinksMessage"
import { BigLink } from "@src/features/root/BigLink"
import { SessionLink } from "@src/features/root/SessionLink"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { useContext } from "react"
import { Helmet } from "react-helmet-async"

interface RootProps {
    content: RootContent
}

export function RootPage({ content }: RootProps) {
    const { showCommandButton } = useContext(ConfigContext)
    const handleCommandActivation = () => {
        NiceModal.show(CommandsDialog)
    }

    return (
        <div className="flex min-h-screen flex-col bg-background py-2 text-foreground">
            <Helmet>
                <title>Student Resources</title>
            </Helmet>
            <CommandsShortcutMount />
            <SkipToMainContent />
            {showCommandButton && (
                <WideLayout>
                    <CommandInput onSelect={handleCommandActivation} />
                </WideLayout>
            )}
            <MainLayout>
                <HeaderSection />
                <ModulesSection modules={content.modules} />
                <ResourcesSection taughtStudents={content.taughtStudents} />
                <SessionArchiveSection archivedFolders={content.sessions} />
            </MainLayout>
        </div>
    )
}

function HeaderSection() {
    const { showQuickLinks } = useContext(ConfigContext)

    return (
        <>
            <RootHeader />
            {showQuickLinks && (
                <QuickLinkContainer>
                    <AddQuickLinkButton />
                    <QuickLinkList />
                    <EmptyQuickLinksMessage />
                </QuickLinkContainer>
            )}
        </>
    )
}

function ModulesSection({ modules }: { modules: ModuleContent[][] }) {
    console.log(modules)

    return (
        <section className="space-y-2">
            <H2>Modules</H2>
            <p className="text-secondary-foreground">
                Directories containing materials for each module.
            </p>
        </section>
    )
}

function ResourcesSection({
    taughtStudents,
}: {
    taughtStudents: ModuleContent[]
}) {
    return (
        <section className="space-y-2">
            <H2>Resources</H2>
            <p className="text-secondary-foreground">
                Additional reference materials and support.
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex flex-1 flex-col gap-3">
                    {taughtStudents.map((folder) => (
                        <BigLink
                            emoji={getModuleEmoji(folder.code)}
                            href={folder.url}
                            key={folder.url}
                        >
                            {folder.code}
                        </BigLink>
                    ))}
                </div>

                <div className="flex flex-1 flex-col gap-3">
                    <BigLink
                        emoji="🧪"
                        href="https://studres.cs.st-andrews.ac.uk/PGR/"
                    >
                        Materials for PGR students
                    </BigLink>
                    <BigLink
                        emoji="🗓️"
                        href="https://studres.cs.st-andrews.ac.uk/timetables/"
                    >
                        Timetables
                    </BigLink>
                    <BigLink
                        emoji="📖"
                        href="https://wiki.cs.st-andrews.ac.uk/index.php"
                    >
                        CS Wiki
                    </BigLink>
                    <BigLink
                        emoji="📚"
                        href="https://studres.cs.st-andrews.ac.uk/library/"
                    >
                        Library
                    </BigLink>
                    <BigLink
                        emoji="ℹ️"
                        href="https://wiki.cs.st-andrews.ac.uk/index.php?title=StudRes"
                    >
                        About Studres
                    </BigLink>
                </div>
            </div>
        </section>
    )
}

function SessionArchiveSection({
    archivedFolders,
}: {
    archivedFolders: ArchivedFolderItem[]
}) {
    return (
        <section className="space-y-2">
            <H2>Session Archive</H2>
            <p className="text-secondary-foreground">
                View past papers/courseworks/class tests/lectures:
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
                {archivedFolders.map((folder) => (
                    <SessionLink folder={folder} key={folder.url} />
                ))}
            </div>
            <p className="text-muted-foreground">
                Pro Tip: In any folder, press Ctrl+K and search for “Time
                travel”
            </p>
        </section>
    )
}

export default RootPage
