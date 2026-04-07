import NiceModal from "@ebay/nice-modal-react"
import MainLayout from "@src/components/layouts/MainLayout"
import WideLayout from "@src/components/layouts/WideLayout"
import H2 from "@src/components/typography/H2"
import { SkipToMainContent } from "@src/features/accessibility/SkipToMainContent"
import CommandInput from "@src/features/command/CommandInput"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { ConfigContext } from "@src/features/config"
import RootHeader from "@src/features/header/RootHeader"
import { RootContent } from "@src/features/parser"
import { ModuleContent } from "@src/features/parser/root/parseRootPageContent"
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
                <ResourcesSection />
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
            <p>Directories containing materials for each module.</p>
        </section>
    )
}

function ResourcesSection() {
    return (
        <section className="space-y-2">
            <H2>Resources</H2>
            <p>Additional reference materials and support.</p>
            <div className="grid grid-cols-2">
                <BigLink>Cheese</BigLink>
                <BigLink>Cheese</BigLink>
                <BigLink>Cheese</BigLink>
            </div>
        </section>
    )
}

function SessionArchiveSection({
    archivedFolders,
}: {
    archivedFolders: ModuleContent[]
}) {
    console.log(archivedFolders)

    return (
        <section className="space-y-2">
            <H2>Session Archive</H2>
            <p>View past papers/courseworks/class tests/lectures:</p>
            <div className="grid grid-cols-2">
                <SessionLink year="2020_2021" />
                <SessionLink year="2020_2021" />
                <SessionLink year="2020_2021" />
                <SessionLink year="2020_2021" />
                <SessionLink year="2020_2021" />
            </div>
        </section>
    )
}

export default RootPage
