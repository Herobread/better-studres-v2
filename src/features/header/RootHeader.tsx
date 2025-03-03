import H1 from "@src/components/typography/H1"
import { StudresIcon } from "@src/components/ui/icons/StudresIcon"
import { ThemeToggle } from "@src/components/ui/theme-toggle"
import { getSpecialDayEmoji, getSpecialDayMessage } from "@src/features/contentEnhancers/emoji/special/getSpecialDayEmoji"
import Link from "../router/Link"
import SubheaderBreadcrumbs from "./SubheaderBreadCrumbs"

export default function RootHeader() {
    const specialEmoji = getSpecialDayEmoji()
    const specialMessage = getSpecialDayMessage()

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <div className="grid grid-cols-[1fr_max-content]">
                    <div className="flex items-end gap-2">
                        <StudresIcon />
                        <div className="flex items-baseline gap-2">
                            <H1>Student Resources</H1>
                            {specialEmoji && specialMessage && (
                                <span title={specialMessage} className="text-2xl">
                                    {specialEmoji}
                                </span>
                            )}
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
                <SubheaderBreadcrumbs />
            </div>

            <p>
                Student Resources (StudRes) is a repository of teaching
                materials, principally for students enrolled on Computer Science
                modules. Staff may add or remove items to this library; students
                may read, copy or download them.
            </p>
            <p>
                <Link
                    href="https://wiki.cs.st-andrews.ac.uk/index.php?title=StudRes"
                    className="underline"
                >
                    More about Student Resources
                </Link>
            </p>
        </div>
    )
}
