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
 * Extracts the links related to taught students from the specific section.
 * @param {HTMLElement} content - The content of the page to parse.
 * @returns {ModuleContent[]} An array of ModuleContent objects representing the links and their labels.
 */
export function extractTaughtStudentsLinks(content: HTMLElement): ModuleContent[] {
    const modules: ModuleContent[] = [];
    
    // Find the heading or element that contains "Taught students"
    const taughtStudentsHeader = Array.from(content.querySelectorAll('h2, h3, p'))
        .find(el => el.textContent?.toLowerCase().includes("taught students"));
    
    if (taughtStudentsHeader) {
        // The next paragraph or block might contain the relevant links
        let currentElement = taughtStudentsHeader.nextElementSibling;

        // Continue iterating through sibling elements until we find the links
        while (currentElement) {
            const links = currentElement.querySelectorAll('a');

            if (links.length > 0) {
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

            // If we find links, we assume this is the correct block and can stop
            if (modules.length > 0) {
                break;
            }

            // Move to the next sibling element
            currentElement = currentElement.nextElementSibling;
        }
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