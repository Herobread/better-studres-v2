import React, { forwardRef, useContext, useState } from "react"
import { Separator } from "../ui/separator"
import { FileLink } from "@src/types/pageContentTypes"
import { ConfigContext } from "@src/contexts/ConfigContext"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu"
import { GitCompareArrowsIcon } from "lucide-react"
import { Dialog, DialogContent } from "../ui/dialog"
import UpdatesDialog from "./UpdatesDialog"
import { isFileLinkTracked, isUrlTracked } from "@src/content/versionControl"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import Link from "../router/Link"

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

        const {
            description,
            href,
            lastModifiedRelative,
            name,
            extension,
            space,
            emoji,
            isImage,
            image,
            lastModified,
        } = fileLink

        const isVersionHistoryAvailable = isFileLinkTracked(fileLink)
        const isToolTipWhyDisabledShown = !isUrlTracked(fileLink.href)

        const ViewUpdateHistoryContextMenuItem = () => {
            return (
                <ContextMenuItem
                    onSelect={() => {
                        setIsViewUpdatesDialogOpen(true)
                    }}
                    disabled={!isVersionHistoryAvailable}
                >
                    <GitCompareArrowsIcon /> View update history
                </ContextMenuItem>
            )
        }

        return (
            <>
                <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <Link
                            ref={ref}
                            {...props}
                            href={href}
                            className="col-span-full grid cursor-pointer grid-cols-subgrid items-center gap-3 rounded-xl bg-primary-foreground p-3 hover:bg-accent"
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

                                {extension && (
                                    <div className="text-center font-mono leading-5">
                                        {extension}
                                    </div>
                                )}
                            </div>
                            <Separator orientation="vertical" />
                            <div className="grid items-center">
                                <div className="font-bold">{name}</div>
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
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <ViewUpdateHistoryContextMenuItem />
                                </TooltipTrigger>
                                <TooltipContent>
                                    Version tracking is disabled for archived
                                    years.
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <ViewUpdateHistoryContextMenuItem />
                        )}
                        {/* <ContextMenuSub>
                        <ContextMenuSubTrigger>
                            <CopyIcon /> Copy commands
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                            <ContextMenuItem>
                                <FolderIcon /> cd to file
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <CloudDownloadIcon /> SSH download
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <DownloadIcon /> Copy local
                            </ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub> */}
                    </ContextMenuContent>
                </ContextMenu>

                <Dialog
                    open={isViewUpdatesDialogOpen}
                    onOpenChange={setIsViewUpdatesDialogOpen}
                >
                    <DialogContent>
                        <UpdatesDialog fileLink={fileLink} />
                    </DialogContent>
                </Dialog>
            </>
        )
    }
)

DefaultFileCard.displayName = "DefaultFileCard"

export default DefaultFileCard
