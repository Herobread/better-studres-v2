import { SearchIcon } from "lucide-react";

interface CommandInputProps {
	onSelect?: () => unknown
}

export default function CommandInput({ onSelect }: CommandInputProps) {
	return <button onClick={onSelect} className="flex items-center gap-1 outline-2 outline outline-muted text-muted-foreground rounded-xl p-1">
		<SearchIcon />
		<p className="flex-grow">
			Search visited folders or run commands
		</p>
		<kbd className="font-bold px-1">⌘K</kbd>
	</button>
}