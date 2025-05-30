import NiceModal from "@ebay/nice-modal-react"
import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import WideLayout from "@src/components/layouts/WideLayout"
import { ThemeToggle } from "@src/components/ui/theme-toggle"
import { SkipToMainContent } from "@src/features/accessibility/SkipToMainContent"
import CommandInput from "@src/features/command/CommandInput"
import { CommandsShortcutMount } from "@src/features/command/CommandsShortcutMount"
import { ConfigContext } from "@src/features/config"
import { FileMetricsTracker } from "@src/features/files"
import { generateFileTitle } from "@src/features/head"
import ModuleHeader from "@src/features/header/ModuleHeader"
import SubheaderBreadcrumbs from "@src/features/header/SubheaderBreadCrumbs"
import { FolderContent } from "@src/features/parser"
import {
    QuickLinkContainer,
    QuickLinkList,
} from "@src/features/quickLinks/components"
import { AddQuickLinkButton } from "@src/features/quickLinks/components/AddQuickLinkButton"
import { EmptyQuickLinksMessage } from "@src/features/quickLinks/components/EmptyQuickLinksMessage"
import { PageStateContext } from "@src/features/router/PageStateContext"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { Table } from "@src/features/table/structure/Table"
import parse from "html-react-parser"
import { useContext } from "react"
import { Helmet } from "react-helmet-async"

interface FolderProps {
    content: FolderContent
}

export default function Folder({ content }: FolderProps) {
    const { isLoading } = useContext(PageStateContext)

    const { fileLinks, sortLinks, extraContent } = content

    const { showCommandButton, showQuickLinks } = useContext(ConfigContext)

    const handleCommandActivation = () => {
        NiceModal.show(CommandsDialog)
    }

    const url = location.href.toString()

    return (
        <div className="min-h-screen bg-background py-2 text-foreground">
            <Helmet>
                <title>{generateFileTitle(url)}</title>
            </Helmet>
            <CommandsShortcutMount />
            <SkipToMainContent />
            {showCommandButton && (
                <WideLayout>
                    <CommandInput onSelect={handleCommandActivation} />
                </WideLayout>
            )}
            <MainLayout>
                <CompactLayout>
                    <div className="grid grid-cols-[1fr_max-content]">
                        <ModuleHeader />
                        <ThemeToggle />
                    </div>
                    <SubheaderBreadcrumbs />
                </CompactLayout>
                {showQuickLinks && (
                    <QuickLinkContainer>
                        <AddQuickLinkButton />
                        <QuickLinkList />
                        <EmptyQuickLinksMessage />
                    </QuickLinkContainer>
                )}
                <Table fileLinks={fileLinks} sortLinks={sortLinks} />
                {extraContent && !isLoading && (
                    <div className="prose w-full dark:prose-invert">
                        {parse(extraContent)}
                    </div>
                )}
                <FileMetricsTracker fileLinks={fileLinks} />
            </MainLayout>
        </div>
    )
}
