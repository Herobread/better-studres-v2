export default function splitFileName(filename: string) {
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
