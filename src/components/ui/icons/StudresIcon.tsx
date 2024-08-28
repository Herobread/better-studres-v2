import { StudresDarkIcon } from "@src/components/ui/icons/StudresDarkIcon"
import { StudresLightIcon } from "@src/components/ui/icons/StudresLightIcon"
import { useTheme } from "@src/features/theme"

export function StudresIcon() {
    const { actualTheme } = useTheme()

    if (actualTheme === "dark") {
        return <StudresDarkIcon />
    }

    return <StudresLightIcon />
}
