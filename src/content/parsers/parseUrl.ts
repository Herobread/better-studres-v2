export default function parseUrl(url: string) {
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
