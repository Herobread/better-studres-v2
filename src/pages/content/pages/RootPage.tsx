import NiceModal from "@ebay/nice-modal-react"
import MainLayout from "@src/components/layouts/MainLayout"
import WideLayout from "@src/components/layouts/WideLayout"
import { SkipToMainContent } from "@src/features/accessibility/SkipToMainContent"
import CommandInput from "@src/features/command/CommandInput"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { ConfigContext } from "@src/features/config"
import RootHeader from "@src/features/header/RootHeader"
import { RootContent } from "@src/features/parser"
import {
    AddQuickLinkButton,
    QuickLinkContainer,
    QuickLinkList,
} from "@src/features/quickLinks/components"
import { EmptyQuickLinksMessage } from "@src/features/quickLinks/components/EmptyQuickLinksMessage"
import MainSection from "@src/features/root/MainSection"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { useContext } from "react"
import { Helmet } from "react-helmet-async"

interface RootProps {
    content: RootContent
}

export function RootPage({ content }: RootProps) {
    const { showCommandButton, showQuickLinks } = useContext(ConfigContext)
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
                <RootHeader />
                {showQuickLinks && (
                    <QuickLinkContainer>
                        <AddQuickLinkButton />
                        <QuickLinkList />
                        <EmptyQuickLinksMessage />
                    </QuickLinkContainer>
                )}
                <MainSection content={content} />
            </MainLayout>
        </div>
    )
}

export default RootPage
