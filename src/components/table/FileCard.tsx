import DefaultFileCard, { DefaultFileCardProps } from "./DefaultFileCard"
import { ImageCard } from "./ImageCard"

export default function FileCard({ fileLink }: DefaultFileCardProps) {
	const { isImage } = fileLink

	if (isImage) {
		return <ImageCard fileLink={fileLink} />
	}

	return <DefaultFileCard fileLink={fileLink} />
}