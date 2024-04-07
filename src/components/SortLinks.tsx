import { SortLink } from "@src/types/pageContentTypes"

interface SortLinksProps {
    sortLinks: SortLink[]
}

export default function SortLinks({ sortLinks }: SortLinksProps) {
    return <div>{JSON.stringify(sortLinks)}</div>
}
