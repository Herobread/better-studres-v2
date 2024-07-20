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
            <kbd className="flex gap-1 rounded-sm bg-background-layer-1 px-2 text-sm">
                <span>⌘</span>K
            </kbd>
        </button>
    )
}
