import { CommandItem } from "../ui/command"
import { getCurrentTheme, useTheme } from "@src/features/theme"

interface ToggleThemeCommandProps {
    setIsCommandOpen: (open: boolean) => void
}

export default function ToggleThemeCommand({
    setIsCommandOpen,
}: ToggleThemeCommandProps) {
    const { theme, setTheme } = useTheme()

    const currentTheme = getCurrentTheme(theme)

    const handleSwitchTheme = () => {
        if (currentTheme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }

        setIsCommandOpen(false)
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
