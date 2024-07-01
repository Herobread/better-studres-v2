import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@src/components/ui/command"
import {
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from "@src/components/ui/context-menu"
import { generateFileLinkKey } from "@src/features/files"
import { FileLink } from "@src/types/pageContentTypes"
import { TagIcon } from "lucide-react"

interface TagFileMenuContextItemProps {
    setIsTagMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    fileLink: FileLink
}

export function TagFileMenuContextItem({
    setIsTagMenuOpen,
    fileLink,
}: TagFileMenuContextItemProps) {
    const { href } = fileLink

    const fileKey = generateFileLinkKey(fileLink)

    return (
        <ContextMenuSub>
            <ContextMenuSubTrigger
                onSelect={() => {
                    setIsTagMenuOpen(true)
                }}
            >
                <TagIcon /> Add tag
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
                <Command>
                    <CommandInput
                        placeholder="Filter tags..."
                        autoFocus={true}
                    />
                    <CommandList>
                        <CommandEmpty>No tag found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem>📜 Todo</CommandItem>
                            <CommandItem>❗️ Important</CommandItem>
                            <CommandItem>➕ Create new tag</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </ContextMenuSubContent>
        </ContextMenuSub>
    )
}
