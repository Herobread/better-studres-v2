import Commands from "@src/components/command/Commands"
import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import QuickLinks from "@src/components/quickAccess/QuickLinks"
import Table from "@src/components/table/Table"
import { PageData } from "@src/types/pageContentTypes"
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

interface RootProps {
    initialContent: PageData
}

export default function Root({ initialContent }: RootProps) {
    const { isLoading, pageData } = useContext(PageStateContext)
    const { fileLinks, sortLinks } = pageData || initialContent

    const { setOpen } = useCommand()
    const { showCommandButton, showQuickLinks } = useContext(ConfigContext)

    const handleCommandActivation = () => {
        setOpen(true)
    }

    return (
        <>
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
        </>
    )
}
