import React, { createContext, useContext, useEffect, useState } from "react"
import { Storage, storage } from "webextension-polyfill"

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
    const [fontFamily, setFontFamilyState] = useState<FontFamily>(
        overrideFont || defaultFont
    )

    useEffect(() => {
        const handleStorageChange = (
            changes: Record<string, Storage.StorageChange>
        ) => {
            if (changes[storageKey]) {
                setFontFamilyState(changes[storageKey].newValue as FontFamily)
            }
        }

        storage.onChanged.addListener(handleStorageChange)
        return () => {
            storage.onChanged.removeListener(handleStorageChange)
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
            // Extra safety to ensure fira is removed
            root.style.fontFamily = ""
            body.style.fontFamily = ""
        }
    }, [fontFamily])

    const setFontFamily = async (newFont: FontFamily) => {
        await storage.local.set({ [storageKey]: newFont })
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
