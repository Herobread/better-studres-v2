import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@src/components/ui/hover-card"
import { forwardRef } from "react"

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
    return (
        <HoverCard>
            <HoverCardTrigger ref={ref} className={className}>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="w-full max-w-96">
                <img src={src} alt={title} />
                <p className="text-center">{title}</p>
            </HoverCardContent>
        </HoverCard>
    )
})

ImagePreviewWrapper.displayName = "ImagePreviewWrapper"

export default ImagePreviewWrapper
