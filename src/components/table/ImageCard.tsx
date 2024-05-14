import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import DefaultFileCard, { DefaultFileCardProps } from "./DefaultFileCard";

export function ImageCard({ fileLink, ...props }: DefaultFileCardProps) {
	const { href, name, extension } = fileLink

	return <HoverCard>
		<HoverCardTrigger asChild>
			<DefaultFileCard fileLink={fileLink} {...props} />
		</HoverCardTrigger>
		<HoverCardContent className="max-w-96 w-full">
			<img src={href} alt={name} className="" />
			<p className="text-center">{name + '.' + extension}</p>
		</HoverCardContent>
	</HoverCard>
}