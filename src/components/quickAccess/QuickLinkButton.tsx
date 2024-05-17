import { ButtonHTMLAttributes, forwardRef } from "react";

interface QuickLinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	content?: string;
	icon: string;
}

const QuickLinkButton = forwardRef<HTMLButtonElement, QuickLinkButtonProps>(
	({ content, icon, ...props }, ref) => {
		return (
			<button
				{...props}
				ref={ref}
				className="flex gap-2 rounded-xl py-1 px-3 bg-primary-foreground hover:bg-accent cursor-pointer"
			>
				<div className="text-base">{icon}</div>
				{content && <div>{content}</div>}
			</button>
		);
	}
);

QuickLinkButton.displayName = 'QuickLinkButton'

export default QuickLinkButton;
