import { ConfigContext } from "@src/features/config"
import { FullFileLink } from "@src/features/parser"
import { useContext } from "react"

interface FileIconProps {
    fileLink: FullFileLink
}

export function FileIcon({ fileLink }: FileIconProps) {
    const { fileIcons, imagePreviewAsIcon } = useContext(ConfigContext)

    const { icon, isImage, href, emoji } = fileLink

    if (isImage && imagePreviewAsIcon) {
        return (
            <img
                src={href}
                alt=""
                style={{ imageRendering: "pixelated" }}
                className="max-h-6 max-w-6"
            />
        )
    }

    if (fileIcons === "emoji") {
        return <div className="text-center leading-5">{emoji}</div>
    }

    if (fileIcons === "pictures") {
        return <img src={icon.src} alt={icon.alt} className="aspect-auto w-5" />
    }
}
