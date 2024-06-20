import parse from 'html-react-parser'
import { useCommand } from "@src/components/command/CommandContext"
import CommandInput from "@src/components/command/CommandInput"
import Commands from "@src/components/command/Commands"
import ModuleHeader from "@src/components/header/ModuleHeader"
import SubheaderBreadcrumbs from "@src/components/header/SubheaderBreadCrumbs"
import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import WideLayout from "@src/components/layouts/WideLayout"
import QuickLinks from "@src/components/quickAccess/QuickLinks"
import Table from "@src/components/table/Table"
import { ThemeToggle } from "@src/components/ui/theme-toggle"
import FileMetricsTracker from "@src/components/versionControl/FileMetricsTracker"
import { FolderContent } from "@src/features/parser"
import { ConfigContext } from "@src/contexts/ConfigContext"
import { PageStateContext } from "@src/contexts/PageStateContext"
import { useContext } from "react"

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
                    <div className="prose w-full">{parse(extraContent)}</div>
                )}
                <FileMetricsTracker fileLinks={fileLinks} />
            </MainLayout>
        </div>
    )
}
