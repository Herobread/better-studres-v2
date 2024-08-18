export interface ModuleContent {
    code: string;
    url: string;
}

/**
 * Parses the root page to extract the modules and their URLs.
 * @param {HTMLElement} content - The content of the root page to parse.
 * @returns {ModuleContent[]} An array of RootContent objects representing modules and their URLs.
 */
export function parseRootPage(content: HTMLElement): {
    modules: ModuleContent[]
    taught_students: ModuleContent[]} {
    const taught_students: ModuleContent[] = extractLinksFromHTML(content);
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
        modules: modules,
        taught_students: taught_students
    } ;
}

/**
 * Extracts the links from the specific <p> element containing links related to teaching modules.
 * @param {HTMLElement} content - The content of the page to parse.
 * @returns {ModuleContent[]} An array of ModuleContent objects representing the links and their labels.
 */
export function extractLinksFromHTML(content: HTMLElement): ModuleContent[] {
    const modules: ModuleContent[] = [];

    // Query for the specific <p> element containing the links
    const linkContainer = content.querySelector('p a[href*="studres.cs.st-andrews.ac.uk/Teaching/"]')?.parentElement;

    // If the link container is found, extract the links
    if (linkContainer) {
        const links = linkContainer.querySelectorAll('a');

        // Iterate over each link and extract the data
        links.forEach(link => {
            const moduleCode = link.textContent?.trim() || "";
            const moduleUrl = link.getAttribute('href') || "";

            // Push the link data into the modules array
            if (moduleCode && moduleUrl) {
                modules.push({
                    code: moduleCode,
                    url: moduleUrl
                });
            }
        });
    }

    // Return the extracted modules
    return modules;
}