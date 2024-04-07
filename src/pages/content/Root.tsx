import { PageData } from "@src/types/pageContentTypes"

export default function Root({ content }: { content: PageData }) {
    return (
        <>
            <pre>{JSON.stringify(content)}</pre>
            <h1>Hello worldasdas</h1>
        </>
    )
}
