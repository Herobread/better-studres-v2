import { ContextMenuItem } from "@src/components/ui/context-menu"
import { useToast } from "@src/components/ui/use-toast"
import { CopyIcon } from "lucide-react"

interface CopyTextMenuItemProps {
    textToCopy: string
    name: string
}

export default function CopyTextMenuItem({
    textToCopy,
    name,
}: CopyTextMenuItemProps) {
    const { toast } = useToast()

    const handleSelect = () => {
        navigator.clipboard.writeText(textToCopy)

        toast({
            title: "✅ Success",
            description: `Copied ${name} to clipboard.`,
        })
    }

    return (
        <ContextMenuItem onSelect={handleSelect}>
            <CopyIcon className="h-4 w-4" /> Copy {name}
        </ContextMenuItem>
    )
}
