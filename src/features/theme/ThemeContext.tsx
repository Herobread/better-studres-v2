import { createContext, useContext, useEffect, useState } from "react"

export type Theme = "dark" | "light"
export type PreferredTheme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: PreferredTheme
    overrideTheme?: PreferredTheme
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

export const THEME_STORAGE_KEY = "vite-ui-theme"

export function ThemeProvider({
    children,
    defaultTheme = "system",
    overrideTheme,
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<PreferredTheme>(() => {
        if (overrideTheme) {
            return overrideTheme
        }

        return (
            (localStorage.getItem(THEME_STORAGE_KEY) as PreferredTheme) ||
            defaultTheme
        )
    })

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
        setTheme: async (theme: PreferredTheme) => {
            localStorage.setItem(THEME_STORAGE_KEY, theme)
            await chrome.storage.local.set({ [THEME_STORAGE_KEY]: theme })
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
