import { ButtonHTMLAttributes, forwardRef } from "react"

interface QuickLinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    content?: string
    icon: string
}

const QuickLinkButton = forwardRef<HTMLButtonElement, QuickLinkButtonProps>(
    ({ content, icon, ...props }, ref) => {
        return (
            <button
                {...props}
                ref={ref}
                className="flex cursor-pointer gap-2 rounded-xl bg-background-layer-1 px-3 py-1 hover:bg-accent"
            >
                <div className="text-base">{icon}</div>
                {content && <div>{content}</div>}
            </button>
        )
    }
)

QuickLinkButton.displayName = "QuickLinkButton"

export default QuickLinkButton
