import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import QuickLinks from "@src/components/quickAccess/QuickLinks"
import Table from "@src/components/table/Table"
import Title from "@src/components/typography/Title"
import { PageData } from "@src/types/pageContentTypes"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Root({ content, }: { content: PageData, }) {
    const { fileLinks, sortLinks, title } = content

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <MainLayout>
                    <CompactLayout>
                        <Title>{title}</Title>
                        <QuickLinks />
                    </CompactLayout>
                    <Table fileLinks={fileLinks} sortLinks={sortLinks} />
                </MainLayout>
            </QueryClientProvider>
        </>
    )
}
