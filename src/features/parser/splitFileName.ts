/**
 * Splits a filename into its name and extension.
 * @param {string} filename - The filename to split.
 * @returns {{ name: string, extension: string | undefined }} An object containing the name and extension of the file.
 */
export function splitFileName(filename: string) {
    if (filename === "Parent Directory") {
        return {
            name: "../",
            extension: undefined,
        }
    }

    if (filename.endsWith("/")) {
        return {
            name: filename.substring(0, filename.length - 1),
            extension: undefined,
        }
    }

    const separatorPosition = filename.lastIndexOf(".")

    if (separatorPosition === -1) {
        return {
            name: filename,
            extension: "file",
        }
    }

    const name = filename.substring(0, separatorPosition)
    const extension = filename.substring(separatorPosition + 1, filename.length)

    return { name, extension }
}
