import { SearchIcon } from "lucide-react"

interface CommandInputProps {
    onSelect?: () => unknown
}

export default function CommandInput({ onSelect }: CommandInputProps) {
    return (
        <button
            onClick={onSelect}
            className="flex items-center gap-1 rounded-xl p-1 text-muted-foreground outline outline-2 outline-muted ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
            <SearchIcon />
            <p className="flex-grow">Search visited folders or run commands</p>
            <kbd className="flex gap-1 rounded-sm bg-background-layer-1 px-2 text-sm">
                <span>⌘</span>K
            </kbd>
        </button>
    )
}
