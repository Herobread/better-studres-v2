export function getTableRows(
    content: HTMLElement,
): NodeListOf<HTMLTableRowElement> {
    const table = content.querySelector("tbody")

    if (!table) {
        throw new Error("table was not found")
    }

    const tableRows = table.querySelectorAll("tr")

    if (!tableRows) {
        throw new Error("table is empty")
    }

    return tableRows
}
