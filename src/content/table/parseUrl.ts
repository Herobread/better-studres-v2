export default function parseUrl(url: string) {
    // Extract the query string
    const queryString = url.split("?")[1]

    // Check if there's a query string
    if (!queryString) {
        return {}
    }

    // Split the query string into individual parameters
    const paramsArray = queryString.split(";")

    // Create an object to store the parameters
    const params: { [key: string]: string } = {}

    // Iterate over the parameters and parse them
    paramsArray.forEach((param) => {
        const [key, value] = param.split("=")
        // Check if both key and value are present
        if (key && value) {
            params[key] = value
        }
    })

    // Return the parsed parameters
    return params
}
