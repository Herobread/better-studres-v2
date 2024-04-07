import FileLinks from "@src/components/FileLinks"
import MainLayout from "@src/components/layouts/MainLayout"
import SortLinks from "@src/components/SortLinks"
import Title from "@src/components/Title"
import { PageData } from "@src/types/pageContentTypes"

export default function Root({ content }: { content: PageData }) {
    const { fileLinks, sortLinks, title } = content

    return (
        <>
            <MainLayout>
                <Title>{title}</Title>
                <SortLinks sortLinks={sortLinks} />
                <FileLinks fileLinks={fileLinks} />
            </MainLayout>
        </>
    )
}
