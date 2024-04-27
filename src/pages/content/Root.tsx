import CompactLayout from "@src/components/layouts/CompactLayout"
import MainLayout from "@src/components/layouts/MainLayout"
import QuickLink from "@src/components/quickAccess/QuickLink"
import QuickLinkContainer from "@src/components/quickAccess/QuickLinkContainer"
import TableLayout from "@src/components/table/TableLayout"
import Title from "@src/components/Title"
import { PageData } from "@src/types/pageContentTypes"

export default function Root({ content }: { content: PageData }) {
    const { fileLinks, sortLinks, title } = content

    return (
        <>
            <MainLayout>
                <CompactLayout>
                    <Title>{title}</Title>
                </CompactLayout>
                <QuickLinkContainer>
                    <QuickLink href="/" name="root" />
                    <QuickLink href="/CS1006" name="CS1006" />
                    <QuickLink href="/" name="root" />
                    <QuickLink href="/" name="root" />
                    <QuickLink href="/" name="root" />
                </QuickLinkContainer>
                <TableLayout>
                    <div></div>
                </TableLayout>
                {/* <Table sortLinks={sortLinks} fileLinks={fileLinks} /> */}
            </MainLayout>
        </>
    )
}