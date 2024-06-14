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
                className="bg-background-layer-1 flex cursor-pointer gap-2 rounded-xl px-3 py-1 hover:bg-accent"
            >
                <div className="text-base">{icon}</div>
                {content && <div>{content}</div>}
            </button>
        )
    }
)

QuickLinkButton.displayName = "QuickLinkButton"

export default QuickLinkButton
