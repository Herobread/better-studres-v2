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
    actualTheme: Theme
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
    actualTheme: "dark",
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

function applyTheme(theme: Theme) {
    const root = window.document.getElementById("__better_studres_theme_root")

    if (!root) {
        return
    }

    root.classList.remove("light", "dark")
    root.classList.add(theme)
    root.style.colorScheme = theme
}

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
    const [actualTheme, setActualTheme] = useState<Theme>(() => {
        return getCurrentTheme(theme)
    })

    useEffect(() => {
        const appliedTheme = getCurrentTheme(theme)
        applyTheme(appliedTheme)
        setActualTheme(appliedTheme)
    }, [theme])

    useEffect(() => {
        const onSystemThemeChange = (e: MediaQueryListEvent) => {
            const newTheme = e.matches ? "dark" : "light"
            setActualTheme(newTheme)
            applyTheme(newTheme)
        }

        const darkModeMediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
        )

        if (theme === "system") {
            darkModeMediaQuery.addEventListener("change", onSystemThemeChange)
        }

        return () => {
            darkModeMediaQuery.removeEventListener(
                "change",
                onSystemThemeChange
            )
        }
    }, [theme])

    const value = {
        theme,
        setTheme: async (newTheme: PreferredTheme) => {
            localStorage.setItem(storageKey, newTheme)
            await chrome.storage.local.set({ [storageKey]: newTheme })
            setTheme(newTheme)
            setActualTheme(getCurrentTheme(newTheme))
        },
        actualTheme,
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
