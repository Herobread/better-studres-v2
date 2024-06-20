/**
 * Parses a URL and extracts its query parameters.
 * @param {string} url - The URL to parse.
 * @returns {{ [key: string]: string }} An object containing the query parameters as key-value pairs.
 */
export function parseUrl(url: string): { [key: string]: string } {
    const queryString = url.split("?")[1]

    if (!queryString) {
        return {}
    }

    const paramsArray = queryString.split(";")
    const params: { [key: string]: string } = {}

    paramsArray.forEach((param) => {
        const [key, value] = param.split("=")
        if (key && value) {
            params[key] = value
        }
    })

    return params
}
