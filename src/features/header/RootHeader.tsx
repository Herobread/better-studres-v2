import H1 from "@src/components/typography/H1"
import { ThemeToggle } from "@src/components/ui/theme-toggle"
import SubheaderBreadcrumbs from "./SubheaderBreadCrumbs"
import Link from "../router/Link"

export default function ModuleHeader() {
    return (
        <div>
            <H1>Student Resources</H1>
            <div className="space-y-4">
                <SubheaderBreadcrumbs />
                <p>
                    Student Resources (StudRes) is a repository of teaching
                    materials, principally for students enrolled on Computer
                    Science modules. Staff may add or remove items to this
                    library; students may read, copy or download them.
                </p>
                <div className="underline">
                    <Link href="https://wiki.cs.st-andrews.ac.uk/index.php?title=StudRes">
                        More about Student Resources
                    </Link>
                </div>
            </div>
        </div>
    )
}
