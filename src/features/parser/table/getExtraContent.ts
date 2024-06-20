export function getExtraContent(htmlElement: HTMLElement): string {
    // Save the original innerHTML
    const originalHTML = htmlElement.innerHTML

    try {
        const firstH1 = htmlElement.querySelector("h1")
        const firstTable = htmlElement.querySelector("table")

        if (firstH1) {
            firstH1.remove()
        }

        if (firstTable) {
            firstTable.remove()
        }

        return htmlElement.innerHTML
    } finally {
        // Restore the original innerHTML
        htmlElement.innerHTML = originalHTML
    }
}
