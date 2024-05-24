import Commands from "@src/components/command/Commands"
import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import QuickLinks from "@src/components/quickAccess/QuickLinks"
import Table from "@src/components/table/Table"
import VirtualFileSystemTracker from "@src/components/table/VirtualFileSystemTracker"
import { PageData } from "@src/types/pageContentTypes"
import ModuleHeader from "@src/components/header/ModuleHeader"
import WideLayout from "@src/components/layouts/WideLayout"
import CommandInput from "@src/components/command/CommandInput"
import { useCommand } from "@src/components/command/CommandContext"
import { useContext } from "react"
import { ConfigContext } from "@src/contexts/ConfigContext"
import SubheaderBreadcrumbs from "@src/components/header/SubheaderBreadcrumbs"
import FileMeticsTracker from "@src/components/versionControl/FileMeticsTracker"
import { useQuery } from "@tanstack/react-query"
import { getTrackedFileLinkMap } from "@src/content/versionControl/fileMetrics"
import { Button } from "@src/components/ui/button"

interface RootProps {
    content: PageData
}

export default function Root({ content }: RootProps) {
    const { fileLinks, sortLinks } = content

    const { data, isLoading } = useQuery({
        queryKey: ['aa'],
        queryFn: getTrackedFileLinkMap
    })

    const { setOpen } = useCommand()
    const { showCommandButton, showQuickLinks } = useContext(ConfigContext)

    if (isLoading) {
        return null
    }

    const handleCommandActivation = () => {
        setOpen(true)
    }

    console.log(data?.trackedFileLinkMap)

    return (
        <>
            <Button onClick={() => {
                chrome.storage.local.set({ 'trackedFileLinkMap': {} })
            }}>Clear</Button>
            <Button onClick={async () => {
                const data = await chrome.storage.local.get('trackedFileLinkMap')
                console.log(data)
            }}>Get</Button>
            <Commands />
            {showCommandButton && (
                <WideLayout>
                    <CommandInput onSelect={handleCommandActivation} />
                </WideLayout>
            )}
            <MainLayout>
                <CompactLayout>
                    <ModuleHeader />
                    <SubheaderBreadcrumbs />
                </CompactLayout>
                {showQuickLinks && <QuickLinks />}
                <Table fileLinks={fileLinks} sortLinks={sortLinks} />
                <VirtualFileSystemTracker fileLinks={fileLinks} />
                <FileMeticsTracker fileLinks={fileLinks} />
            </MainLayout>
        </>
    )
}
