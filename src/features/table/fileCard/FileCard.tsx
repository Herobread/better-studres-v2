import { Separator } from "@src/components/ui/separator"
import { FullFileLink } from "@src/features/parser"
import Link from "@src/features/router/Link"
import { FileDescription } from "./FileDescription"
import { FileExtension } from "./FileExtension"
import { FileIcon } from "./FileIcon"
import { FileModifiedDate } from "./FileModifiedDate"
import { FileName } from "./FileName"
import { FileSize } from "./FileSize"
import { FileTags } from "./FileTags"

interface FileCardProps {
    fileLink: FullFileLink
}

export function FileCard({ fileLink }: FileCardProps) {
    const { href, name, extension } = fileLink

    const LONG_EXTENSION_LENGTH = 4
    const isLongExtensionName =
        !!extension && extension?.length > LONG_EXTENSION_LENGTH

    return (
        <Link
            className="col-span-full grid cursor-pointer grid-cols-subgrid items-center gap-3 rounded-xl bg-background-layer-1 p-3 hover:bg-accent"
            href={href}
        >
            <div className="grid w-full justify-items-center">
                <FileIcon fileLink={fileLink} />
                {!isLongExtensionName && (
                    <FileExtension extension={extension} />
                )}
            </div>
            <Separator orientation="vertical" />
            <div className="grid items-center">
                <div className="flex flex-wrap gap-2">
                    <FileName
                        fileLink={fileLink}
                        showExtension={isLongExtensionName}
                    />
                    <FileTags fileLink={fileLink} />
                </div>
                <FileDescription fileLink={fileLink} />
            </div>
            <FileSize fileLink={fileLink} />
            <FileModifiedDate fileLink={fileLink} />
        </Link>
    )
}
