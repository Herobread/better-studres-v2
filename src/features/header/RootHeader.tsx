import H1 from "@src/components/typography/H1"
import { StudresIcon } from "@src/components/ui/icons/StudresIcon"
import { ThemeToggle } from "@src/components/ui/theme-toggle"
import Link from "../router/Link"
import SubheaderBreadcrumbs from "./SubheaderBreadCrumbs"

export default function RootHeader() {
    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <div className="grid grid-cols-[1fr_max-content]">
                    <div className="flex items-end gap-2">
                        <StudresIcon />
                        <H1>Student Resources</H1>
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
