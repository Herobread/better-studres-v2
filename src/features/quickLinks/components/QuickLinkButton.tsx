import { QuickLinkCardBase } from "@src/features/quickLinks/components/quickLink/QuickLinkCardBase"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface QuickLinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    content?: string
    icon: string
}

const QuickLinkButton = forwardRef<HTMLButtonElement, QuickLinkButtonProps>(
    ({ content, icon, ...props }, ref) => {
        return (
            <button {...props} ref={ref}>
                <QuickLinkCardBase icon={icon} name={content} />
            </button>
        )
    }
)

QuickLinkButton.displayName = "QuickLinkButton"

export default QuickLinkButton
