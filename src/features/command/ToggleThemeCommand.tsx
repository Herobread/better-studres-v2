import NiceModal from "@ebay/nice-modal-react"
import CommandsDialog from "@src/features/shared/dialogs/CommandsDialog"
import { getCurrentTheme, useTheme } from "@src/features/theme"
import { CommandItem } from "../../components/ui/command"

interface ToggleThemeCommandProps {}

export default function ToggleThemeCommand({}: ToggleThemeCommandProps) {
    const { theme, setTheme } = useTheme()

    const currentTheme = getCurrentTheme(theme)

    const handleSwitchTheme = () => {
        if (currentTheme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }

        NiceModal.hide(CommandsDialog)
    }

    return (
        <CommandItem
            onSelect={handleSwitchTheme}
            keywords={["theme", "dark", "light"]}
        >
            {currentTheme === "dark" ? "🌑" : "☀"} Toggle theme
        </CommandItem>
    )
}
