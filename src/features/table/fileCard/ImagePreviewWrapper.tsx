import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@src/components/ui/hover-card"
import { forwardRef, useState } from "react"

interface ImagePreviewWrapperProps {
    src: string
    title: string
    children: React.ReactNode
    className?: string
}

const ImagePreviewWrapper = forwardRef<
    HTMLAnchorElement,
    ImagePreviewWrapperProps
>(({ src, title, className, children }, ref) => {
    const [imageRendering, setImageRendering] = useState<"auto" | "pixelated">(
        "auto"
    )

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget
        if (img.naturalWidth <= 32 && img.naturalHeight <= 32) {
            setImageRendering("pixelated")
        }
    }

    return (
        <HoverCard>
            <HoverCardTrigger ref={ref} className={className}>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="flex h-fit w-auto max-w-[var(--radix-hover-card-trigger-width)] items-center justify-center">
                <div className="flex min-w-16 items-center justify-center">
                    <img
                        src={src}
                        alt={title}
                        onLoad={handleImageLoad}
                        style={{
                            imageRendering,
                        }}
                        className="max-h-[40vh] w-full object-contain"
                    />
                </div>
            </HoverCardContent>
        </HoverCard>
    )
})

ImagePreviewWrapper.displayName = "ImagePreviewWrapper"

export default ImagePreviewWrapper
