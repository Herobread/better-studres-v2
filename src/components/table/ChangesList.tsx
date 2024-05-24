interface ChangesListProps {
	changes: string[]
}

export default function ChangesList({ changes }: ChangesListProps) {
	return <ul>{
		changes.map(change => {
			return <li key={change}>{change}</li>
		})
	}</ul>
}