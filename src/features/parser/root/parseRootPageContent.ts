export interface ModuleContent {
    code: string;
    url: string;
}

/**
 * Main function that orchestrates the parsing of the root page.
 * It delegates the extraction of taught students' links and modules to other functions.
 * @param {HTMLElement} content - The content of the root page to parse.
 * @returns {object} An object containing arrays of ModuleContent for modules and taught students.
 */
export function parseRootPage(content: HTMLElement): {
    modules: ModuleContent[],
    taught_students: ModuleContent[]
} {
    const taught_students = extractTaughtStudentsLinks(content);
    const modules = extractModulesLinks(content);

    return {
        modules: modules,
        taught_students: taught_students
    };
}

/**
 * Extracts the links related to taught students from the specific <p> element.
 * @param {HTMLElement} content - The content of the page to parse.
 * @returns {ModuleContent[]} An array of ModuleContent objects representing the links and their labels.
 */
export function extractTaughtStudentsLinks(content: HTMLElement): ModuleContent[] {
    const modules: ModuleContent[] = [];

    const linkContainer = content.querySelector('p a[href*="studres.cs.st-andrews.ac.uk/Teaching/"]')?.parentElement;

    if (linkContainer) {
        const links = linkContainer.querySelectorAll('a');

        links.forEach(link => {
            const moduleCode = link.textContent?.trim() || "";
            const moduleUrl = link.href || "";
            if (moduleCode && moduleUrl) {
                modules.push({
                    code: moduleCode,
                    url: moduleUrl
                });
            }
        });
    }

    return modules;
}

/**
 * Extracts the modules and their URLs from the section after the "Modules" header.
 * @param {HTMLElement} content - The content of the page to parse.
 * @returns {ModuleContent[]} An array of ModuleContent objects representing modules and their URLs.
 */
export function extractModulesLinks(content: HTMLElement): ModuleContent[] {
    const modules: ModuleContent[] = [];

    const modulesHeader = Array.from(content.querySelectorAll('h2')).find(h2 => h2.textContent === 'Modules');

    if (modulesHeader) {
        let nextElement = modulesHeader.nextElementSibling;

        while (nextElement && nextElement.tagName.toLowerCase() !== 'h2') {
            const links = nextElement.querySelectorAll('a');

            links.forEach(link => {
                const moduleCode = link.textContent?.trim();
                const moduleUrl = link.href || "";

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

    return modules;
}