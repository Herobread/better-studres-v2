import { createContext, useContext, useEffect, useMemo, useState } from "react"

const UNIQUE_THEME_CONFIG = {
    light: {
        type: "light",
        displayName: "Light",
    },
    dark: {
        type: "dark",
        displayName: "Dark",
    },
    "dark-plus": {
        type: "dark",
        displayName: "Dark+",
    },
    grey: {
        type: "dark",
        displayName: "Grey",
    },
    "grey-orange": {
        type: "dark",
        displayName: "Grey Orange",
    },
    "black-pink": {
        type: "dark",
        displayName: "Blackpink",
    },
    "black-cyan": {
        type: "dark",
        displayName: "Dark Cyan",
    },
    "light-pink": {
        type: "light",
        displayName: "Light pink",
    },
    "light-blue": {
        type: "light",
        displayName: "Light Blue",
    },
} as const

export type Theme = keyof typeof UNIQUE_THEME_CONFIG

export const THEME_CONFIG = {
    ...UNIQUE_THEME_CONFIG,
    system: {
        type: "system",
        displayName: "System",
    },
} as const

export type PreferredTheme = keyof typeof THEME_CONFIG
export const THEME_OPTIONS = Object.keys(THEME_CONFIG) as PreferredTheme[]

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

        root.classList.remove(...THEME_OPTIONS)
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
