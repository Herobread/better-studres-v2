import { useQuery } from "@tanstack/react-query"

export interface GoogleFont {
    family: string
    category: string
    variants: string[]
    subsets: string[]
}

const FONTS_URL =
    "https://raw.githubusercontent.com/r0m80/google-fonts-metadata/master/data/google-fonts.json"

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
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })
}
