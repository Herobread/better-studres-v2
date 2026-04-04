import { useQuery } from "@tanstack/react-query"

export interface GoogleFont {
    family: string
    category: string
    variants: string[]
    subsets: string[]
}

const FONTS_URL =
    "https://raw.githubusercontent.com/fontsource/google-font-metadata/main/data/google-fonts-v1.json"

export function useGoogleFonts() {
    return useQuery({
        queryKey: ["google-fonts"],
        queryFn: async () => {
            const response = await fetch(FONTS_URL)
            if (!response.ok) {
                throw new Error("Failed to fetch fonts")
            }
            const data = (await response.json()) as Record<string, GoogleFont>
            return Object.values(data).map((font) => ({
                value: font.family,
                label: font.family,
            }))
        },
        staleTime: Infinity, // we're caching fonts without timeout cuz they're basically static
    })
}
