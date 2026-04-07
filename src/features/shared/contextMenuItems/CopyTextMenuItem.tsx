import { ContextMenuItem } from "@src/components/ui/context-menu"
import { useToast } from "@src/components/ui/use-toast"
import { CopyIcon } from "lucide-react"
import React from "react"

interface CopyTextMenuItemProps {
    icon?: React.ReactNode
    textToCopy: string
    messageItemName?: string
    name: string
}

export default function CopyTextMenuItem({
    icon,
    textToCopy,
    messageItemName,
    name,
}: CopyTextMenuItemProps) {
    const { toast } = useToast()

    const handleSelect = () => {
        navigator.clipboard.writeText(textToCopy)

        toast({
            title: "✅ Success",
            description: `Copied ${messageItemName || name} to clipboard.`,
        })
    }

    return (
        <ContextMenuItem onSelect={handleSelect}>
            {icon || <CopyIcon className="h-4 w-4" />}
            {name}
        </ContextMenuItem>
    )
}
