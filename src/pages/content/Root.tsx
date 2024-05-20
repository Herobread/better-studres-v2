import Commands from "@src/components/command/Commands"
import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import QuickLinks from "@src/components/quickAccess/QuickLinks"
import Table from "@src/components/table/Table"
import VirtualFileSystemTracker from "@src/components/table/VirtualFileSystemTracker"
import { PageData } from "@src/types/pageContentTypes"
import ModuleHeader from "@src/components/header/ModuleHeader"
import SubheaderBreadCrumbs from "@src/components/header/SubheaderBreadCrumbs"
import WideLayout from "@src/components/layouts/WideLayout"
import CommandInput from "@src/components/command/CommandInput"
import { useCommand } from "@src/components/command/CommandContext"

export default function Root({ content }: { content: PageData, }) {
    const { fileLinks, sortLinks } = content
    const { setOpen } = useCommand()

    const handleCommandActivation = () => {
        setOpen(true)
    }

    return (
        <>
            <Commands />
            <WideLayout>
                <CommandInput onSelect={handleCommandActivation} />
            </WideLayout>
            <MainLayout>
                <CompactLayout>
                    <ModuleHeader />
                    <SubheaderBreadCrumbs />
                </CompactLayout>
                <QuickLinks />
                <Table fileLinks={fileLinks} sortLinks={sortLinks} />
                <VirtualFileSystemTracker fileLinks={fileLinks} />
            </MainLayout>
        </>
    )
}
