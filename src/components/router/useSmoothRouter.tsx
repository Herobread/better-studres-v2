import { useContext } from "react";
import { parsePageContent } from "@src/content/parsers/parser";
import redirect from "@src/lib/redirect";
import { PageStateContext } from "@src/contexts/PageStateContext";

const useSmoothRouter = () => {
	const { setIsLoading, setPageData } = useContext(PageStateContext);

	const navigateToPage = async (href: string) => {
		console.log('handling navigation to ' + href);

		setIsLoading(true);
		const data = await fetch(href);

		if (!data.ok) {
			redirect(href);
			return; // Make sure to return if redirecting
		}

		const htmlText = await data.text();
		const parser = new DOMParser();
		const { body } = parser.parseFromString(htmlText, 'text/html');
		const pageData = parsePageContent(body);

		setPageData(pageData);
		setIsLoading(false);

		window.history.pushState({}, '', href);
	};

	return { navigateToPage };
};

export default useSmoothRouter;
