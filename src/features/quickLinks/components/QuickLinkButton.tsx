import { Button } from "@src/components/ui/button"
import { QuickLinkCardBase } from "@src/features/quickLinks/components/quickLink/QuickLinkCardBase"
import { cn } from "@src/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface QuickLinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    content?: string
    icon: string
}

const QuickLinkButton = forwardRef<HTMLButtonElement, QuickLinkButtonProps>(
    ({ content, icon, className, ...props }, ref) => {
        return (
            <Button
                variant="ghost"
                {...props}
                ref={ref}
                className={cn(
                    "h-auto rounded-xl p-0 outline-none transition-colors",
                    "ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    className
                )}
            >
                <QuickLinkCardBase icon={icon} name={content} />
            </Button>
        )
    }
)

QuickLinkButton.displayName = "QuickLinkButton"

export default QuickLinkButton
