import Commands from "@src/components/command/Commands"
import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import QuickLinks from "@src/components/quickAccess/QuickLinks"
import Table from "@src/components/table/Table"
import ModuleHeader from "@src/components/header/ModuleHeader"
import WideLayout from "@src/components/layouts/WideLayout"
import CommandInput from "@src/components/command/CommandInput"
import { useCommand } from "@src/components/command/CommandContext"
import { useContext } from "react"
import { ConfigContext } from "@src/contexts/ConfigContext"
import FileMetricsTracker from "@src/components/versionControl/FileMetricsTracker"
import SubheaderBreadcrumbs from "@src/components/header/SubheaderBreadCrumbs"
import { PageStateContext } from "@src/contexts/PageStateContext"
import { ThemeToggle } from "@src/components/ui/theme-toggle"
import { PageData } from "@src/content/parsers/parser"
import NotFound from "./pages/NotFound"

interface RootProps {
    initialPageData: PageData
}

export default function Root({ initialPageData }: RootProps) {
    const { isLoading, pageData: contextPageData } =
        useContext(PageStateContext)

    const pageData = contextPageData || initialPageData

    const { setOpen } = useCommand()
    const { showCommandButton, showQuickLinks } = useContext(ConfigContext)

    if (pageData.type === "not found") {
        return <NotFound />
    }

    if (pageData.type !== "folder") {
        throw new Error("unhandled page")
    }

    const { content } = pageData

    const { fileLinks, sortLinks } = content

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
                <FileMetricsTracker fileLinks={fileLinks} />
            </MainLayout>
        </div>
    )
}
