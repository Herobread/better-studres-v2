import { FileLink } from "@src/types/pageContentTypes"

interface FileLinkCardProps {
    fileLink: FileLink
}

export default function FileLinkCard({ fileLink }: FileLinkCardProps) {
    const { href, lastModified, name, size } = fileLink

    return (
        <a href={href} className="flex">
            {JSON.stringify(fileLink)}
            <p>{name}</p>
            <div>{lastModified}</div>
            <div>{size}</div>
        </a>
    )
}
