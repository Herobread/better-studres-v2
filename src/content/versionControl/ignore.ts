export const UNTRACKED_FILE_NAMES = [
    "../", // Parent directory
    "^d{4}_d{4}.*$", // previous years (not tracked for performance)
]

/**
 * Check if version control tracks or ignores the file
 * @param fileName
 * @returns
 */
export function isFileNameTracked(fileName: string) {
    return UNTRACKED_FILE_NAMES.some((pattern) => {
        const regex = new RegExp(pattern)
        return regex.test(fileName)
    })
}
