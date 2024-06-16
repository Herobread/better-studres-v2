import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"
type PreferredTheme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: PreferredTheme
    storageKey?: string
}

type ThemeProviderState = {
    theme: PreferredTheme
    setTheme: (theme: PreferredTheme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

/**
 * if the theme is set to system, it will determine real theme
 *
 * @param theme
 * @returns 'dark' or 'light'
 */
export function getCurrentTheme(theme: PreferredTheme): Theme {
    if (theme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
    }

    return theme
}

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<PreferredTheme>(
        () =>
            (localStorage.getItem(storageKey) as PreferredTheme) || defaultTheme
    )

    useEffect(() => {
        const root = window.document.getElementById(
            "__better_studres_theme_root"
        )

        if (!root) {
            return
        }

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = getCurrentTheme(theme)

            root.classList.add(systemTheme)
            root.style.colorScheme = systemTheme
            return
        }

        root.classList.add(theme)
        root.style.colorScheme = theme
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: PreferredTheme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
