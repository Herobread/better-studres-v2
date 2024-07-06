import { ConfigContext } from "@src/features/config"
import { FullFileLink } from "@src/features/parser"
import { useContext } from "react"

interface FileModifiedDateProps {
    fileLink: FullFileLink
}

export function FileModifiedDate({ fileLink }: FileModifiedDateProps) {
    const {
        lastModified: { raw, difference },
    } = fileLink
    const { date } = useContext(ConfigContext)
    let content = raw

    if (date === "relative") {
        content = difference
    }

    return <div className="text-right">{content}</div>
}
