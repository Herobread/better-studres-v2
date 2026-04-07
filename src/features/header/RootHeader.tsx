import H1 from "@src/components/typography/H1"
import { StudresIcon } from "@src/components/ui/icons/StudresIcon"
import { ThemeToggle } from "@src/components/ui/theme-toggle"
import {
    getSpecialDayEmoji,
    getSpecialDayMessage,
} from "@src/features/contentEnhancers/emoji/special/getSpecialDayEmoji"
import SubheaderBreadcrumbs from "./SubheaderBreadCrumbs"

export default function RootHeader() {
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-[1fr_max-content]">
                <div className="flex items-end gap-2">
                    <StudresIcon />
                    <div className="flex items-baseline gap-2">
                        <H1>Student Resources</H1>
                        <SpecialEmoji />
                    </div>
                </div>
                <ThemeToggle />
            </div>
            <SubheaderBreadcrumbs />
        </div>
    )
}

function SpecialEmoji() {
    const specialEmoji = getSpecialDayEmoji()
    const specialMessage = getSpecialDayMessage()

    return (
        <>
            {specialEmoji && specialMessage && (
                <span title={specialMessage} className="text-2xl">
                    {specialEmoji}
                </span>
            )}
        </>
    )
}
