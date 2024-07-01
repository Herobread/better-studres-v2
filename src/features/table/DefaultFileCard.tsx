import { ConfigContext } from "@src/features/config"
import { isFileLinkTracked, isUrlTracked } from "@src/features/files"
import { FileLink } from "@src/types/pageContentTypes"
import React, { forwardRef, useContext, useState } from "react"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuTrigger,
} from "../../components/ui/context-menu"
import { Separator } from "../../components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../../components/ui/tooltip"
import Link from "../router/Link"
import CopyPathMenuItem from "../shared/commands/CopyPathMenuItem"
import DownloadFileMenuItem from "./contextMenuItems/DownloadFileMenuItem"
import { TagFileMenuContextItem } from "./contextMenuItems/TagFileMenuContextItem"
import { UpdatesContextMenuItem } from "./contextMenuItems/UpdatesContextMenuItem"
import { TagFileMenuDialog } from "./dialogs/TagFileMenuDialog"
import UpdatesDialog from "./dialogs/changes/UpdatesDialog"

export interface DefaultFileCardProps {
    fileLink: FileLink
    children?: React.ReactNode
    [key: string]: unknown
}

const DefaultFileCard = forwardRef<HTMLAnchorElement, DefaultFileCardProps>(
    ({ fileLink, ...props }, ref) => {
        const { fileIcons, date, imagePreviewAsIcon } =
            useContext(ConfigContext)

        const [isViewUpdatesDialogOpen, setIsViewUpdatesDialogOpen] =
            useState(false)

        const [isTagMenuOpen, setIsTagMenuOpen] = useState(false)

        const {
            description,
            href,
            lastModifiedRelative,
            name,
            extension,
            space,
            emoji,
            isImage,
            isFolder,
            fullName,
            image,
            lastModified,
        } = fileLink

        const isVersionHistoryAvailable = isFileLinkTracked(fileLink)
        const isToolTipWhyDisabledShown = !isUrlTracked(fileLink.href)

        const isLongExtensionName = extension && extension?.length > 4

        return (
            <>
                <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <Link
                            isHard={!isFolder}
                            ref={ref}
                            {...props}
                            href={href}
                            className="col-span-full grid cursor-pointer grid-cols-subgrid items-center gap-3 rounded-xl bg-background-layer-1 p-3 hover:bg-accent"
                        >
                            <div className="grid w-full justify-items-center">
                                {isImage && imagePreviewAsIcon ? (
                                    <img
                                        src={href}
                                        alt=""
                                        style={{ imageRendering: "pixelated" }}
                                        className="max-h-6 max-w-6"
                                    />
                                ) : fileIcons === "emoji" ? (
                                    <div className="text-center leading-5">
                                        {emoji}
                                    </div>
                                ) : (
                                    <img
                                        src={image?.src}
                                        alt={image?.alt}
                                        className="aspect-auto w-5"
                                    />
                                )}
                                {!isLongExtensionName && (
                                    <div className="text-center font-mono leading-5">
                                        {extension}
                                    </div>
                                )}
                            </div>
                            <Separator orientation="vertical" />
                            <div className="grid items-center">
                                <div className="font-bold">
                                    {name}
                                    {isLongExtensionName && "." + extension}
                                </div>
                                {description != null && (
                                    <div className="italic">{description}</div>
                                )}
                            </div>
                            <div className="text-right">
                                {space?.size.toFixed(1)}
                            </div>
                            <div className="ml-[-8px]">{space?.units}</div>
                            <div className="text-right">
                                {date === "relative"
                                    ? lastModifiedRelative
                                    : lastModified}
                            </div>
                        </Link>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        {isToolTipWhyDisabledShown ? (
                            <Tooltip>
                                <TooltipTrigger>
                                    <UpdatesContextMenuItem
                                        isVersionHistoryAvailable={
                                            isVersionHistoryAvailable
                                        }
                                        setIsViewUpdatesDialogOpen={
                                            setIsViewUpdatesDialogOpen
                                        }
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    Version tracking is disabled for archived
                                    years.
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <UpdatesContextMenuItem
                                isVersionHistoryAvailable={
                                    isVersionHistoryAvailable
                                }
                                setIsViewUpdatesDialogOpen={
                                    setIsViewUpdatesDialogOpen
                                }
                            />
                        )}
                        <CopyPathMenuItem href={href} />
                        <DownloadFileMenuItem
                            href={href}
                            isFolder={isFolder}
                            fileName={fullName}
                        />
                        <TagFileMenuContextItem
                            setIsTagMenuOpen={setIsTagMenuOpen}
                            fileLink={fileLink}
                        />
                    </ContextMenuContent>
                </ContextMenu>

                <UpdatesDialog
                    fileLink={fileLink}
                    open={isViewUpdatesDialogOpen}
                    onOpenChange={setIsViewUpdatesDialogOpen}
                />
                <TagFileMenuDialog
                    open={isTagMenuOpen}
                    onOpenChange={setIsTagMenuOpen}
                />
            </>
        )
    }
)

DefaultFileCard.displayName = "DefaultFileCard"

export default DefaultFileCard
