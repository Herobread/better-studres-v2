import { RootContent } from "./parser";

/**
 * Parses the root page to extract the modules and their URLs.
 * @param {HTMLElement} content - The content of the root page to parse.
 * @returns {RootContent[]} An array of RootContent objects representing modules and their URLs.
 */
export function parseRootPage(content: HTMLElement): RootContent[] {
    const modules: RootContent[] = [];

    // Locate the h2 element with text content 'Modules'
    const modulesHeader = Array.from(content.querySelectorAll('h2')).find(h2 => h2.textContent === 'Modules');

    // If the Modules section is found
    if (modulesHeader) {
        // Find the next sibling elements, which should contain the modules
        let nextElement = modulesHeader.nextElementSibling;

        // Iterate over the sibling elements until we reach the end of the module section
        while (nextElement && nextElement.tagName.toLowerCase() !== 'h2') {
            // Look for links within the paragraphs
            const links = nextElement.querySelectorAll('a');

            // Iterate through each link to extract module code and URL
            links.forEach(link => {
                const moduleCode = link.textContent?.trim();
                const moduleUrl = link.getAttribute('href') || "";

                if (moduleCode && moduleUrl) {
                    modules.push({
                        code: moduleCode,
                        url: moduleUrl
                    });
                }
            });

            // Move to the next sibling element
            nextElement = nextElement.nextElementSibling;
        }
    }

    return modules;
}