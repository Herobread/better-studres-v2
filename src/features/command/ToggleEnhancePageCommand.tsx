import { CommandItem } from "@src/components/ui/command"
import { toggleBlackListForUrl } from "../extensionToggle/blacklist"

export function ToggleEnhancePageCommand() {
    const handleSelect = async () => {
        await toggleBlackListForUrl(location.href)

        location.reload()
    }

    return (
        <CommandItem
            onSelect={handleSelect}
            keywords={["not", "improve", "disable"]}
        >
            {"📃 Don't enhance this page / Add to blacklist"}
        </CommandItem>
    )
}
