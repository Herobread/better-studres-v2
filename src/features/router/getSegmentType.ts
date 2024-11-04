/**
 * Determines the type of a given segment string based on specific patterns.
 *
 * @param {string} segment - The segment string to evaluate.
 * @returns {string} - Returns the type of the segment, which can be "archive", "module code", or "generic".
 *
 * The function checks:
 * - "archive" if the segment matches the format `YYYY_YYYY` (4 digits followed by an underscore and another 4 digits).
 * - "module code" if the segment matches the format `XX0000` (2 letters, 4 digits).
 * - "generic" if it does not match any of the above patterns.
 */
export function getSegmentType(segment: string) {
    const archivedYearRegex = /^\d{4}_\d{4}$/

    if (archivedYearRegex.test(segment)) {
        return "archive"
    }

    const moduleCodeRegex = /^[A-Za-z]{2}\d{4}$/

    if (moduleCodeRegex.test(segment)) {
        return "module code"
    }

    return "generic"
}
