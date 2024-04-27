import FileCard from "./FileCard"

interface TableLayoutProps {
	children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TableLayout({ children }: TableLayoutProps) {
	return <div className="grid grid-cols-[39px_auto_4fr_max-content_max-content_3fr]">
		<FileCard size="1223" unit="Mb" />
		<FileCard size="123" unit="Kb" />
		<FileCard size="13" unit="b" />
	</div>
}