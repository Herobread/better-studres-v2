import { SearchIcon } from "lucide-react"

interface CommandInputProps {
    onSelect?: () => unknown
}

export default function CommandInput({ onSelect }: CommandInputProps) {
    return (
        <button
            onMouseDown={onSelect}
            className="flex items-center gap-1 rounded-xl p-1 text-muted-foreground outline outline-2 outline-muted"
        >
            <SearchIcon />
            <p className="flex-grow">Search visited folders or run commands</p>
            <kbd className="px-1 font-bold">⌘K</kbd>
        </button>
    )
}
