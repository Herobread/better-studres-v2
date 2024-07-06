import { Badge } from "@src/components/ui/badge"
import { ConfigContext } from "@src/features/config"
import {
    generateFileLinkKey,
    isFileLinkTracked,
    isUrlTracked,
} from "@src/features/files"
import { FileLink } from "@src/types/pageContentTypes"
import { useQuery } from "@tanstack/react-query"
import React, { forwardRef, useContext, useState } from "react"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "../../components/ui/context-menu"
import { Separator } from "../../components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../../components/ui/tooltip"
import { TAGS_QUERY_KEY, Tag, getFileTags } from "../files/tags/storage"
import Link from "../router/Link"
import CopyPathMenuItem from "../shared/commands/CopyPathMenuItem"
import DownloadFileMenuItem from "./contextMenuItems/DownloadFileMenuItem"
import { UpdatesContextMenuItem } from "./contextMenuItems/UpdatesContextMenuItem"
import { TagFileMenuContextItem } from "./contextMenuItems/tags/TagFileMenuContextItem"
import UpdatesDialog from "./dialogs/changes/UpdatesDialog"
import { TagFileMenuDialog } from "./dialogs/tags/TagFileMenuDialog"

export interface DefaultFileCardProps {
    fileLink: FileLink
    children?: React.ReactNode
    setActiveTag: React.Dispatch<React.SetStateAction<Tag>>
    isManageTagsMenuOpen: boolean
    setIsManageTagsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    isViewTaggedFilesDialogOpen: boolean
    setIsViewTaggedFilesDialogOpen: React.Dispatch<
        React.SetStateAction<boolean>
    >
    [key: string]: unknown
}

const DefaultFileCard = forwardRef<HTMLAnchorElement, DefaultFileCardProps>(
    (
        {
            fileLink,
            setActiveTag,
            isManageTagsMenuOpen,
            setIsManageTagsMenuOpen,
            isViewTaggedFilesDialogOpen,
            setIsViewTaggedFilesDialogOpen,
            ...props
        },
        ref
    ) => {
        const { fileIcons, date, imagePreviewAsIcon } =
            useContext(ConfigContext)

        const fileKey = generateFileLinkKey(fileLink)

        const { data: tags } = useQuery({
            queryKey: [TAGS_QUERY_KEY, TAGS_QUERY_KEY + fileKey],
            queryFn: async () => {
                return await getFileTags(fileKey)
            },
        })

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

        const [isViewUpdatesDialogOpen, setIsViewUpdatesDialogOpen] =
            useState(false)
        const [isTagMenuOpen, setIsTagMenuOpen] = useState(false)
        const isTagContextMenuDisabled = fullName === "Parent Directory"

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
                                <div className="flex flex-wrap gap-2">
                                    <span className="font-bold">
                                        {name}
                                        {isLongExtensionName && "." + extension}
                                    </span>
                                    {!isTagContextMenuDisabled &&
                                        tags &&
                                        tags?.length > 0 &&
                                        tags.map((tag) => {
                                            return (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        setIsViewTaggedFilesDialogOpen(
                                                            true
                                                        )
                                                        setActiveTag(tag)
                                                    }}
                                                    key={tag.id}
                                                >
                                                    <Badge
                                                        variant={"secondary"}
                                                    >
                                                        {tag.name}
                                                    </Badge>
                                                </button>
                                            )
                                        })}
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
                        <ContextMenuLabel>
                            <div className="flex gap-1">
                                <p>{fullName}</p>
                                {space && (
                                    <span className="text-muted-foreground">
                                        {space?.size}
                                        {space?.units}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {fileKey}
                            </p>
                        </ContextMenuLabel>
                        <ContextMenuSeparator />
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
                        {!isTagContextMenuDisabled && (
                            <>
                                <ContextMenuSeparator />
                                <TagFileMenuContextItem
                                    fileTags={tags}
                                    setIsTagMenuOpen={setIsTagMenuOpen}
                                    fileLink={fileLink}
                                    setIsManageTagsMenuOpen={
                                        setIsManageTagsMenuOpen
                                    }
                                />
                            </>
                        )}
                    </ContextMenuContent>
                </ContextMenu>

                <UpdatesDialog
                    fileLink={fileLink}
                    open={isViewUpdatesDialogOpen}
                    onOpenChange={setIsViewUpdatesDialogOpen}
                />
                <TagFileMenuDialog
                    fileLink={fileLink}
                    open={isTagMenuOpen}
                    setIsTagFileMenuDialogOpen={setIsTagMenuOpen}
                />
            </>
        )
    }
)

DefaultFileCard.displayName = "DefaultFileCard"

export default DefaultFileCard
