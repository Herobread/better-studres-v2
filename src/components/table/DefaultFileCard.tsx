import React, { forwardRef, useContext } from "react";
import { Separator } from "../ui/separator";
import { FileLink } from "@src/types/pageContentTypes";
import { ConfigContext } from "@src/contexts/ConfigContext";
// import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu";
// import { CloudDownloadIcon, CopyIcon, DownloadIcon, FolderIcon, GitCompareArrowsIcon } from "lucide-react";

export interface DefaultFileCardProps {
	fileLink: FileLink;
	children?: React.ReactNode;
	[key: string]: unknown;
}

const DefaultFileCard = forwardRef<HTMLAnchorElement, DefaultFileCardProps>(
	({ fileLink, ...props }, ref) => {
		const { fileIcons, date, imagePreviewAsIcon } = useContext(ConfigContext)

		const { description, href, lastModifiedRelative, name, extension, space, emoji, isImage, image, lastModified } = fileLink;

		return (
			// <ContextMenu>
			// 	<ContextMenuTrigger asChild>
			<a
				ref={ref}
				{...props}
				href={href}
				className="grid p-3 gap-3 grid-cols-subgrid col-span-full bg-primary-foreground hover:bg-accent cursor-pointer rounded-xl items-center"
			>
				<div className="w-full grid justify-items-center">
					{(isImage && imagePreviewAsIcon) ? (
						<img
							src={href}
							alt=""
							style={{ imageRendering: 'pixelated' }}
							className="max-w-6 max-h-6"
						/>
					) : (
						(fileIcons === 'emoji'
							?
							<div className="text-center leading-5">{emoji}</div>
							:
							<img src={image?.src} alt={image?.alt} className="w-5 aspect-auto" />
						)
					)}

					{extension && <div className="font-mono text-center leading-5">{extension}</div>}
				</div>
				<Separator orientation="vertical" />
				<div className="grid items-center">
					<div className="font-bold">{name}</div>
					{description != null && <div className="italic">{description}</div>}
				</div>
				<div className="text-right">{space?.size.toFixed(1)}</div>
				<div className="ml-[-8px]">{space?.units}</div>
				<div className="text-right">
					{
						date === 'relative' ?
							lastModifiedRelative
							:
							lastModified
					}
				</div>
			</a>
		)
		{/* </ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>
						<GitCompareArrowsIcon /> Track updates
					</ContextMenuItem>
					<ContextMenuSub>
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
					</ContextMenuSub>
				</ContextMenuContent>
			</ContextMenu>
		)
	*/}
	}
)

DefaultFileCard.displayName = 'DefaultFileCard';

export default DefaultFileCard;
