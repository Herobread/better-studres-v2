import React, { forwardRef } from "react";
import { Separator } from "../ui/separator";
import { FileLink } from "@src/types/pageContentTypes";

export interface DefaultFileCardProps {
	fileLink: FileLink;
	children?: React.ReactNode;
	[key: string]: any;
}

const DefaultFileCard = forwardRef<HTMLAnchorElement, DefaultFileCardProps>(
	({ fileLink, ...props }, ref) => {
		const { description, href, lastModifiedRelative, name, extension, space, emoji, isImage } = fileLink;

		return (
			<a
				ref={ref}
				{...props}
				href={href}
				className="grid p-3 gap-3 grid-cols-subgrid col-span-full bg-primary-foreground hover:bg-accent cursor-pointer rounded-xl items-center"
			>
				<div className="w-full grid justify-items-center">
					{isImage ? (
						<img
							src={href}
							alt=""
							style={{ imageRendering: 'pixelated' }}
							className="max-w-6 max-h-6"
						/>
					) : (
						<div className="text-center leading-5">{emoji}</div>
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
				<div className="text-right">{lastModifiedRelative}</div>
			</a>
		);
	}
);

DefaultFileCard.displayName = 'DefaultFileCard';

export default DefaultFileCard;
