import { ConfigContext } from "@src/features/config"
import { FileLastModified } from "@src/features/parser"
import { useContext } from "react"

interface FileModifiedDateProps {
    lastModified: FileLastModified
}

export function FileModifiedDate({ lastModified }: FileModifiedDateProps) {
    const { date } = useContext(ConfigContext)
    let content = lastModified.raw

    if (date === "relative") {
        content = lastModified.difference
    }

    return <div className="text-right">{content}</div>
}
