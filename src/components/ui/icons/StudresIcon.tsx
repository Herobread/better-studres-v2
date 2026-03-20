import { StudresDarkIcon } from "@src/components/ui/icons/StudresDarkIcon"
import { StudresLightIcon } from "@src/components/ui/icons/StudresLightIcon"
import { THEME_CONFIG, useTheme } from "@src/features/theme"

export function StudresIcon() {
    const { actualTheme } = useTheme()

    const isDark = THEME_CONFIG[actualTheme].type === "dark"

    if (isDark) {
        return <StudresDarkIcon />
    }

    return <StudresLightIcon />
}
