import parse from "html-react-parser"
import { useCommand } from "@src/features/command/CommandContext"
import CommandInput from "@src/features/command/CommandInput"
import Commands from "@src/features/command/Commands"
import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import WideLayout from "@src/components/layouts/WideLayout"
import { QuickLinks } from "@src/features/quickAccess/"
import Table from "@src/features/table/Table"
import { ThemeToggle } from "@src/components/ui/theme-toggle"
import { FileMetricsTracker } from "@src/features/versionControl"
import { FolderContent } from "@src/features/parser"
import { useContext } from "react"
import { PageStateContext } from "@src/features/router/PageStateContext"
import { ConfigContext } from "@src/features/config"
import ModuleHeader from "@src/features/header/ModuleHeader"
import SubheaderBreadcrumbs from "@src/features/header/SubheaderBreadCrumbs"

interface FolderProps {
    content: FolderContent
}

export default function Folder({ content }: FolderProps) {
    const { fileLinks, sortLinks, extraContent } = content

    const { isLoading } = useContext(PageStateContext)

    const { setOpen } = useCommand()
    const { showCommandButton, showQuickLinks } = useContext(ConfigContext)

    const handleCommandActivation = () => {
        setOpen(true)
    }

    return (
        <div className="min-h-screen bg-background py-2 text-foreground">
            <Commands />
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
                {showQuickLinks && <QuickLinks />}
                <Table
                    isLoading={isLoading}
                    fileLinks={fileLinks}
                    sortLinks={sortLinks}
                />
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
