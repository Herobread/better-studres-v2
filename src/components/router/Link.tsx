import { AnchorHTMLAttributes, MouseEvent, forwardRef } from "react";
import useSmoothRouter from "./useSmoothRouter";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> { }

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ ...props }, ref) => {
	const { href } = props

	const { navigateToPage } = useSmoothRouter()

	const handleNavigation = async (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()

		if (!href) {
			return;
		}

		navigateToPage(href)
	}

	return <a ref={ref} {...props} onClick={handleNavigation} />;
});

Link.displayName = 'Link'

export default Link;
