import { Button } from "@src/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu"
import { PreferredTheme, THEME_CONFIG, useTheme } from "@src/features/theme"
import { cn } from "@src/lib/utils"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
    const { actualTheme } = useTheme()

    const isDark = THEME_CONFIG[actualTheme].type === "dark"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun
                        className={cn(
                            "h-[1.2rem] w-[1.2rem] transition-all",
                            isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"
                        )}
                    />
                    <Moon
                        className={cn(
                            "absolute h-[1.2rem] w-[1.2rem] transition-all",
                            isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
                        )}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ThemeOption themeOption="dark" />
                <ThemeOption themeOption="light" />
                <DropdownMenuSeparator />
                <ThemeOption themeOption="black-pink" />
                <ThemeOption themeOption="black-cyan" />
                <ThemeOption themeOption="light-pink" />
                <ThemeOption themeOption="light-blue" />
                <ThemeOption themeOption="grey-orange" />
                <ThemeOption themeOption="dark-plus" />
                <DropdownMenuSeparator />
                <ThemeOption themeOption="system" />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const STANDARDS: Record<
    string,
    { label: string; left: string; right: string; preview: string }
> = {
    system: {
        label: "System",
        left: "bg-white",
        right: "bg-black",
        preview: "",
    },
    light: {
        label: "Light",
        left: "bg-white",
        right: "bg-zinc-200",
        preview: "light",
    },
    dark: {
        label: "Dark",
        left: "bg-black",
        right: "bg-zinc-800",
        preview: "dark",
    },
}

function ThemeOption({ themeOption }: { themeOption: PreferredTheme }) {
    const { setTheme, theme: currentSelection } = useTheme()

    const ui = STANDARDS[themeOption] || {
        label: THEME_CONFIG[themeOption].displayName,
        left:
            THEME_CONFIG[themeOption].type === "dark" ? "bg-black" : "bg-white",
        right: "bg-ring",
        preview: themeOption,
    }

    const isSelected = currentSelection === themeOption

    return (
        <DropdownMenuItem
            onSelect={() => setTheme(themeOption)}
            className={`flex gap-2 transition-colors ${ui.preview}`}
        >
            <div
                className={`flex ${isSelected ? "rounded-full outline outline-2 outline-offset-1 outline-ring" : ""}`}
            >
                <div
                    className={`h-4 w-2 rounded-s-full border border-e-0 border-muted ${ui.left}`}
                />
                <div
                    className={`h-4 w-2 rounded-e-full border border-s-0 border-muted ${ui.right}`}
                />
            </div>
            <span className="text-sm font-medium">{ui.label}</span>
        </DropdownMenuItem>
    )
}
