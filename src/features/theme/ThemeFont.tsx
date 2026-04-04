import React, { createContext, useContext, useEffect, useState } from "react"
import { Storage, storage } from "webextension-polyfill"

export type FontFamily = string

export const FONT_STORAGE_KEY = "vite-ui-font"

export function loadGoogleFont(fontName: string) {
    if (fontName === "default" || fontName === "fira") return

    const fontId = `google-font-${fontName.replace(/\s+/g, "-").toLowerCase()}`
    if (document.getElementById(fontId)) return

    const link = document.createElement("link")
    link.id = fontId
    link.rel = "stylesheet"
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, "+")}:wght@400;500;700&display=swap`
    document.head.appendChild(link)
}

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

        if (fontFamily === "default") {
            root.style.setProperty("--font-family", "inherit")
            root.style.fontFamily = ""
            body.style.fontFamily = ""
        } else {
            loadGoogleFont(fontFamily)
            const fontValue = `'${fontFamily}', sans-serif`
            root.style.setProperty("--font-family", fontValue)
            root.style.setProperty("font-family", fontValue, "important")
            body.style.setProperty("font-family", fontValue, "important")
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
