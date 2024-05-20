import { useContext } from "react"
import DefaultFileCard, { DefaultFileCardProps } from "./DefaultFileCard"
import { ImageCard } from "./ImageCard"
import { ConfigContext } from "@src/contexts/ConfigContext"

export default function FileCard({ fileLink }: DefaultFileCardProps) {
	const { isImage } = fileLink

	const { imagePreviewOnHover } = useContext(ConfigContext)

	if (isImage && imagePreviewOnHover) {
		return <ImageCard fileLink={fileLink} />
	}

	return <DefaultFileCard fileLink={fileLink} />
}