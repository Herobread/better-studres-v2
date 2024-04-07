import { FileLink } from "@src/types/pageContentTypes"
import FileLinkCard from "./FileLinkCard"
import ListLayout from "./layouts/ListLayout"

interface FileLinksProps {
    fileLinks: FileLink[]
}

export default function FileLinks({ fileLinks }: FileLinksProps) {
    return (
        <ListLayout>
            {fileLinks.map((fileLink) => {
                return <FileLinkCard fileLink={fileLink} key={fileLink.href} />
            })}
        </ListLayout>
    )
}
