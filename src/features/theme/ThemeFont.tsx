import React, { createContext, useContext, useEffect, useState } from "react"

export type FontFamily = "default" | "fira"

export const FONT_STORAGE_KEY = "vite-ui-font"

type FontProviderState = {
    fontFamily: FontFamily
    setFontFamily: (font: FontFamily) => void
}

const FontProviderContext = createContext<FontProviderState | undefined>(
    undefined
)

export function FontProvider({
    children,
    defaultFont = "default",
    storageKey = FONT_STORAGE_KEY,
    overrideFont,
}: {
    children: React.ReactNode
    defaultFont?: FontFamily
    storageKey?: string
    overrideFont?: FontFamily
}) {
    const [fontFamily, setFontFamilyState] = useState<FontFamily>(() => {
        if (overrideFont) return overrideFont
        return (localStorage.getItem(storageKey) as FontFamily) || defaultFont
    })

    useEffect(() => {
        const handleStorageChange = (
            changes: Record<string, chrome.storage.StorageChange>
        ) => {
            if (changes[storageKey]) {
                setFontFamilyState(changes[storageKey].newValue as FontFamily)
            }
        }

        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.onChanged.addListener(handleStorageChange)
        }
        return () => {
            if (typeof chrome !== "undefined" && chrome.storage) {
                chrome.storage.onChanged.removeListener(handleStorageChange)
            }
        }
    }, [storageKey])

    useEffect(() => {
        if (overrideFont) {
            setFontFamilyState(overrideFont)
        }
    }, [overrideFont])

    useEffect(() => {
        const root =
            window.document.getElementById("__better_studres_theme_root") ||
            window.document.documentElement
        const body = window.document.body

        if (fontFamily === "fira") {
            root.classList.add("font-fira")
            body.classList.add("font-fira")
        } else {
            root.classList.remove("font-fira")
            body.classList.remove("font-fira")
        }
    }, [fontFamily])

    const setFontFamily = async (newFont: FontFamily) => {
        localStorage.setItem(storageKey, newFont)
        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.local.set({ [storageKey]: newFont })
        }
        setFontFamilyState(newFont)
    }

    const value = {
        fontFamily,
        setFontFamily,
    }

    return (
        <FontProviderContext.Provider value={value}>
            {children}
        </FontProviderContext.Provider>
    )
}

export const useFont = () => {
    const context = useContext(FontProviderContext)
    if (!context) throw new Error("useFont must be used within a FontProvider")
    return context
}
