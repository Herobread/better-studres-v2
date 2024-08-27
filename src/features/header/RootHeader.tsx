import H1 from "@src/components/typography/H1"
import StudresIcon from "@src/components/ui/icons/StudresLightIcon"
import StudresDarkIcon from "@src/components/ui/icons/StudresDarkIcon"
import SubheaderBreadcrumbs from "./SubheaderBreadCrumbs"
import Link from "../router/Link"
import { useTheme } from "../theme"

export default function RootHeader() {
    const { actualTheme } = useTheme()

    return (
        <div className="space-y-4">
            <div className="flex items-baseline space-x-4">
                {actualTheme === "dark" ? <StudresDarkIcon /> : <StudresIcon />}
                <H1>Student Resources</H1>
            </div>

            <SubheaderBreadcrumbs />
            <p>
                Student Resources (StudRes) is a repository of teaching
                materials, principally for students enrolled on Computer Science
                modules. Staff may add or remove items to this library; students
                may read, copy or download them.
            </p>

            <Link
                href="https://wiki.cs.st-andrews.ac.uk/index.php?title=StudRes"
                className="underline"
            >
                More about Student Resources
            </Link>
        </div>
    )
}
