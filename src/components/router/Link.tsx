import { parsePageContent } from "@src/content/parsers/parser";
import redirect from "@src/lib/redirect";
import React, { AnchorHTMLAttributes, MouseEvent, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> { }

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ ...props }, ref) => {
	const { href } = props

	const handleNavigation = async (e: MouseEvent<HTMLAnchorElement>) => {
		console.log('handling navigation to ' + href)
		e.preventDefault()

		if (!href) {
			console.log('no href, wtf')
			return
		}

		const data = await fetch(href)

		if (!data.ok) {
			redirect(href)
		}

		const htmlText = await data.text()
		const parser = new DOMParser();
		const { body } = parser.parseFromString(htmlText, 'text/html');
		const pageData = parsePageContent(body)

		console.log(pageData)
	}

	return <a ref={ref} {...props} onClick={handleNavigation} />;
});

Link.displayName = 'Link'

export default Link;
