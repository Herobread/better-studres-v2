import { ContextMenuItem } from "@src/components/ui/context-menu"
import { useToast } from "@src/components/ui/use-toast"
import { CopyIcon } from "lucide-react"

interface CopyPathMenuItemProps {
    href: string
}

export default function CopyPathMenuItem({ href }: CopyPathMenuItemProps) {
    const { toast } = useToast()

    const handleSelect = () => {
        navigator.clipboard.writeText(href)

        toast({
            title: "✅ Success",
            description: "Copied URL to clipboard.",
        })
    }

    return (
        <ContextMenuItem onSelect={handleSelect}>
            <CopyIcon /> Copy URL
        </ContextMenuItem>
    )
}
