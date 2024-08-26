import H1 from "@src/components/typography/H1"
import { ThemeToggle } from "@src/components/ui/theme-toggle"
import SubheaderBreadcrumbs from "./SubheaderBreadCrumbs"

export default function ModuleHeader() {
    return (
        <div>
            <H1>Student Resources</H1>
            <SubheaderBreadcrumbs />
            <p>
                Student Resources (StudRes) is a repository of teaching
                materials, principally for students enrolled on Computer Science
                modules. Staff may add or remove items to this library; students
                may read, copy or download them.
            </p>
        </div>
    )
}
