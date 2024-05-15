import Commands from "@src/components/command/Commands"
import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import QuickLinks from "@src/components/quickAccess/QuickLinks"
import Table from "@src/components/table/Table"
import VirtualFileSystemTracker from "@src/components/table/VirtualFileSystemTracker"
import Title from "@src/components/typography/Title"
import { PageData } from "@src/types/pageContentTypes"
import Providers from "./Providers"

export default function Root({ content, }: { content: PageData, }) {
    const { fileLinks, sortLinks, title } = content

    return (
        <>
            <Providers>
                <Commands />
                <MainLayout>
                    <CompactLayout>
                        <Title>{title}</Title>
                        <QuickLinks />
                    </CompactLayout>
                    <Table fileLinks={fileLinks} sortLinks={sortLinks} />
                    <VirtualFileSystemTracker fileLinks={fileLinks} />
                </MainLayout>
            </Providers>
        </>
    )
}
