import { StudresDarkIcon } from "@src/components/ui/icons/StudresDarkIcon"
import { StudresLightIcon } from "@src/components/ui/icons/StudresLightIcon"
import { DARK_THEMES, useTheme } from "@src/features/theme"

export function StudresIcon() {
    const { actualTheme } = useTheme()

    if (DARK_THEMES.includes(actualTheme)) {
        return <StudresDarkIcon />
    }

    return <StudresLightIcon />
}
