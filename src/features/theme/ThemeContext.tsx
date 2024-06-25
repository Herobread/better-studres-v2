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
    storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<PreferredTheme>(() => {
        if (overrideTheme) {
            return overrideTheme
        }
        return (
            (localStorage.getItem(storageKey) as PreferredTheme) || defaultTheme
        )
    })

    useEffect(() => {
        const root = window.document.documentElement // use documentElement for better compatibility

        if (!root) {
            return
        }

        root.classList.remove("light", "dark")

        const appliedTheme = getCurrentTheme(theme)
        root.classList.add(appliedTheme)
        root.style.colorScheme = appliedTheme
    }, [theme])

    const value = {
        theme,
        setTheme: async (newTheme: PreferredTheme) => {
            localStorage.setItem(storageKey, newTheme)
            await chrome.storage.local.set({ [storageKey]: newTheme })
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

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return context
}
