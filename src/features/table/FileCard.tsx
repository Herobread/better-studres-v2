import { ConfigContext } from "@src/features/config"
import { useContext } from "react"
import DefaultFileCard, { DefaultFileCardProps } from "./DefaultFileCard"
import { ImageCard } from "./ImageCard"

export default function FileCard({ fileLink, ...props }: DefaultFileCardProps) {
    const { isImage } = fileLink

    const { imagePreviewOnHover } = useContext(ConfigContext)

    if (isImage && imagePreviewOnHover) {
        return <ImageCard fileLink={fileLink} {...props} />
    }

    return <DefaultFileCard fileLink={fileLink} {...props} />
}
