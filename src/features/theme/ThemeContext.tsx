import { createContext, useContext, useEffect, useMemo, useState } from "react"

export const THEMES = ["light", "dark", "dark-amoled", "grey"] as const
export const DARK_THEMES = ["dark", "dark-amoled", "grey"]
export type Theme = (typeof THEMES)[number]
export type PreferredTheme = Theme | "system"

type ThemeProviderState = {
    theme: PreferredTheme
    setTheme: (theme: PreferredTheme) => void
    actualTheme: Theme
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
    undefined
)

export function getCurrentTheme(theme: PreferredTheme): Theme {
    if (theme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
    }
    return theme as Theme
}

export const THEME_STORAGE_KEY = "vite-ui-theme"

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = THEME_STORAGE_KEY,
}: {
    children: React.ReactNode
    defaultTheme?: PreferredTheme
    storageKey?: string
}) {
    const [theme, setTheme] = useState<PreferredTheme>(() => {
        return (
            (localStorage.getItem(storageKey) as PreferredTheme) || defaultTheme
        )
    })

    const actualTheme = useMemo(() => getCurrentTheme(theme), [theme])

    useEffect(() => {
        const root =
            window.document.getElementById("__better_studres_theme_root") ||
            window.document.documentElement

        root.classList.remove(...THEMES)
        root.classList.add(actualTheme)
        root.style.colorScheme = actualTheme
    }, [actualTheme])

    const value = {
        theme,
        actualTheme,
        setTheme: async (newTheme: PreferredTheme) => {
            localStorage.setItem(storageKey, newTheme)
            if (typeof chrome !== "undefined" && chrome.storage) {
                chrome.storage.local.set({ [storageKey]: newTheme })
            }
            setTheme(newTheme)
        },
    }

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider")
    return context
}
