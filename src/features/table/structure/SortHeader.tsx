import { parseUrl } from "@src/features/parser"
import { cva } from "class-variance-authority"
import Link from "../../router/Link"

interface SortHeaderProps {
    style?: "bold" | "normal" | null | undefined
    href: string
    column: string
    children: React.ReactNode
}

export default function SortHeader({
    children,
    style,
    column,
    href,
}: SortHeaderProps) {
    const header = cva(["flex", "gap-1", "group", "cursor-pointer"], {
        defaultVariants: {
            intent: "normal",
        },
        variants: {
            intent: {
                normal: [],
                bold: ["font-bold"],
            },
        },
    })

    const sort = "desc"

    const searchParams = parseUrl(window.location.href)

    const COLUMN_PARAMETER = "C"
    const ORDER_PARAMETER = "O"

    const rawColumn = searchParams[COLUMN_PARAMETER] || "N"
    const rawOrder = searchParams[ORDER_PARAMETER] || "A"

    const columns: { [key: string]: string } = {
        N: "Name",
        S: "Size",
        M: "Last modified",
    }

    const orders: { [key: string]: string } = {
        A: "asc",
        D: "desc",
    }

    const currentColumn = columns[rawColumn]
    const currentOrder = orders[rawOrder]

    const sortEmoji: { [key: string]: string } = {
        asc: "⬆️",
        desc: "⬇️",
    }

    let emoji = ""

    if (currentColumn === column) {
        emoji = sortEmoji[currentOrder]
    }

    return (
        <Link
            className={header({ intent: style })}
            href={href}
            transitionData={{
                direction: currentOrder === "asc" ? "top" : "bottom",
            }}
        >
            <div>{children}</div>
            {sort != null && (
                <div className="opacity-50 transition-opacity duration-200 group-hover:opacity-100">
                    {emoji}
                </div>
            )}
        </Link>
    )
}
