import { Button } from "@src/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu"
import { ToggleGroup, ToggleGroupItem } from "@src/components/ui/toggle-group"
import {
    FontFamily,
    PreferredTheme,
    THEME_CONFIG,
    useFont,
    useTheme,
} from "@src/features/theme"
import { cn } from "@src/lib/utils"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
    const { actualTheme } = useTheme()
    const { fontFamily, setFontFamily } = useFont()

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
            <DropdownMenuContent
                align="end"
                className="grid min-w-[240px] grid-cols-2 gap-x-1"
            >
                <DropdownMenuLabel className="col-span-2 px-3 py-2">
                    Appearance
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="col-span-2 mx-1" />

                <div className="col-span-2 px-2 py-1.5">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Theme
                    </p>
                </div>

                <ThemeOption themeOption="dark" />
                <ThemeOption themeOption="light" />

                <DropdownMenuSeparator className="col-span-2 mx-1" />

                <ThemeOption themeOption="dark-plus" />
                <div></div>
                <ThemeOption themeOption="grey" />
                <div></div>

                <DropdownMenuSeparator className="col-span-2 mx-1" />

                <ThemeOption themeOption="black-pink" />
                <ThemeOption themeOption="light-pink" />

                <ThemeOption themeOption="black-cyan" />
                <ThemeOption themeOption="light-blue" />

                <ThemeOption themeOption="grey-orange" />
                <div></div>

                <DropdownMenuSeparator className="col-span-2 mx-1" />

                <ThemeOption themeOption="system" />
                <div></div>

                <DropdownMenuSeparator className="col-span-2 mx-1" />

                <div className="col-span-2 px-2 py-1.5 pb-3">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Font Family
                    </p>
                    <ToggleGroup
                        type="single"
                        size="sm"
                        className="grid grid-cols-2"
                        value={fontFamily}
                        onValueChange={(value) => {
                            if (value) {
                                setFontFamily(value as FontFamily)
                            }
                        }}
                    >
                        <ToggleGroupItem value="default">
                            📝 Default
                        </ToggleGroupItem>
                        <ToggleGroupItem value="fira">
                            💻 Fira Code
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
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
