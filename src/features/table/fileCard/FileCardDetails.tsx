import { Separator } from "@src/components/ui/separator"
import { useDownloadInfo } from "@src/features/fileDownload/DownloadInfoContext"
import { FullFileLink } from "@src/features/parser"
import Link from "@src/features/router/Link"
import { TransitionData } from "@src/features/router/PageStateContext"
import { FileCustomDescription } from "@src/features/table/fileCard/FileCustomDescription"
import { forwardRef } from "react"
import { FileDescription } from "./FileDescription"
import { FileExtension } from "./FileExtension"
import { FileIcon } from "./FileIcon"
import { FileModifiedDate } from "./FileModifiedDate"
import { FileName } from "./FileName"
import { FileSize } from "./FileSize"
import { FileTags } from "./FileTags"

export interface FileCardDetailsProps {
    fileLink: FullFileLink
}

const FileCardDetails = forwardRef<HTMLAnchorElement, FileCardDetailsProps>(
    ({ fileLink }, ref) => {
        const { isKeyDownloading } = useDownloadInfo()

        const { href, extension, fullName, fileKey } = fileLink

        const isDownloading = isKeyDownloading(fileKey)

        const LONG_EXTENSION_LENGTH = 4
        const isLongExtensionName =
            !!extension && extension.length > LONG_EXTENSION_LENGTH

        const isParentDir = fullName.includes("Parent Directory")

        const transitionData: TransitionData = {
            direction: isParentDir ? "left" : "right",
        }

        return (
            <Link
                ref={ref}
                data-downloading={isDownloading}
                className="data-[downloading=true]:outline-white data-[downloading=true]:outline-none data-[downloading=true]:outline-4 data-[downloading=true]:outline-offset-0 data-[downloading=true]:bg-gradient-flow bg-200% animate-background-flow col-span-full grid cursor-pointer grid-cols-subgrid items-center gap-3 rounded-xl bg-background-layer-1 p-3 hover:bg-accent"
                href={href}
                transitionData={transitionData}
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
                            fullName={fileLink.fullName}
                            name={fileLink.name}
                            showExtension={isLongExtensionName}
                        />
                        {!isParentDir && (
                            <FileTags fileKey={fileLink.fileKey} />
                        )}
                    </div>
                    <FileDescription description={fileLink.description} />
                    {!isParentDir && (
                        <FileCustomDescription fileKey={fileLink.fileKey} />
                    )}
                </div>
                <FileSize size={fileLink.size} />
                <FileModifiedDate lastModified={fileLink.lastModified} />
            </Link>
        )
    }
)

FileCardDetails.displayName = "FileCardDetails"

export default FileCardDetails
