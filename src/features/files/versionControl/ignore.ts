import { FullFileLink } from "@src/features/parser"

export function isFileLinkTracked(fileLink: FullFileLink) {
    return isFileNameTracked(fileLink.name) && isUrlTracked(fileLink.href)
}

// List of filename patterns that are not tracked
export const UNTRACKED_FILENAME_PATTERNS = [
    /.*\.\..*/, // Parent directory, "../"
]

// List of URL patterns that are not tracked
export const UNTRACKED_URL_PATTERNS = [
    /.*\d{4}_\d{4}.*/, // Matches 4 digits, an underscore, another 4 digits, and any other characters
    /.*_this_session.*/, // Matches any string that contains '_this_session'
]

/**
 * Check if version control tracks or ignores the filename.
 * @param fileName - The name of the file to check.
 * @returns true if the file is tracked, false if it is not tracked.
 */
export function isFileNameTracked(fileName: string): boolean {
    return !checkIfStringMatchesStringPatterns(
        fileName,
        UNTRACKED_FILENAME_PATTERNS
    )
}

/**
 * Check if version control tracks or ignores the URL.
 * @param url - The URL to check.
 * @returns true if the URL is tracked, false if it is not tracked.
 */
export function isUrlTracked(url: string): boolean {
    return !checkIfStringMatchesStringPatterns(url, UNTRACKED_URL_PATTERNS)
}

/**
 * Check if the given string matches any of the provided patterns.
 * @param str - The string to check.
 * @param patterns - An array of string patterns to match against.
 * @returns true if the string matches any pattern, false otherwise.
 */
export function checkIfStringMatchesStringPatterns(
    str: string,
    patterns: RegExp[]
): boolean {
    return patterns.some((regex) => {
        return regex.test(str)
    })
}
