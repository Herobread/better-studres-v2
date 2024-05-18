import { SearchIcon } from "lucide-react";

interface CommandInputProps {
	onSelect?: () => unknown
}

export default function CommandInput({ onSelect }: CommandInputProps) {
	return <button onClick={onSelect} className="flex items-center gap-1 outline-2 outline outline-muted text-muted-foreground rounded-xl p-2">
		<SearchIcon />
		<p className="flex-grow">
			Search visited folders or run commands
		</p>
		<code className="font-bold">⌘K</code>
	</button>
}