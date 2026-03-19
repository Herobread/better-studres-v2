import { Button } from "@src/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu"
import { useTheme } from "@src/features/theme"
import { cn } from "@src/lib/utils"
import { Moon, Sun } from "lucide-react"

const DARK_THEMES = ["dark", "dark-amoled"]

export function ThemeToggle() {
    const { theme, setTheme, actualTheme } = useTheme()

    const isDark = DARK_THEMES.includes(actualTheme)

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
                <DropdownMenuCheckboxItem
                    checked={theme === "light"}
                    onCheckedChange={() => setTheme("light")}
                >
                    Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={theme === "dark"}
                    onCheckedChange={() => setTheme("dark")}
                >
                    Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={theme === "dark-amoled"}
                    onCheckedChange={() => setTheme("dark-amoled")}
                >
                    Dark Amoled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={theme === "grey"}
                    onCheckedChange={() => setTheme("grey")}
                >
                    Grey Orange
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={theme === "black-pink"}
                    onCheckedChange={() => setTheme("black-pink")}
                >
                    Black Pink
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={theme === "black-cyan"}
                    onCheckedChange={() => setTheme("black-cyan")}
                >
                    Black Cyan
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={theme === "system"}
                    onCheckedChange={() => setTheme("system")}
                >
                    System
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
