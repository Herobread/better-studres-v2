export interface ModuleContent {
    code: string;
    url: string;
}

/**
 * Parses the root page to extract the modules and their URLs.
 * @param {HTMLElement} content - The content of the root page to parse.
 * @returns {ModuleContent[]} An array of RootContent objects representing modules and their URLs.
 */
export function parseRootPage(content: HTMLElement): {modules: ModuleContent[]} {
    const modules: ModuleContent[] = [];

    const modulesHeader = Array.from(content.querySelectorAll('h2')).find(h2 => h2.textContent === 'Modules');

    if (modulesHeader) {
        let nextElement = modulesHeader.nextElementSibling;

        while (nextElement && nextElement.tagName.toLowerCase() !== 'h2') {
            const links = nextElement.querySelectorAll('a');

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

            nextElement = nextElement.nextElementSibling;
        }
    }

    return {
        modules: modules
    } ;
}