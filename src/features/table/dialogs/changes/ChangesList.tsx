interface ChangesListProps {
    changes: string[]
}

export default function ChangesList({ changes }: ChangesListProps) {
    return (
        <ul>
            {changes.map((change) => {
                if (change === "0B") {
                    change = "Unknown size"
                }

                return <li key={change}>{change}</li>
            })}
        </ul>
    )
}
