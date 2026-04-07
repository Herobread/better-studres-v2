import {
    ContextMenu,
    ContextMenuTrigger,
} from "@src/components/ui/context-menu"
import Link from "@src/features/router/Link"
import { getAcademicYearStart } from "@src/lib/utils"
import { ArchivedFolderItem } from "../parser/root/parseRootPageContent"
import { BasicContextMenu } from "./BasicContextMenu"

export function SessionLink({ folder }: { folder: ArchivedFolderItem }) {
    const { url, endYear, startYear } = folder

    const currentAcademicStart = getAcademicYearStart(new Date())
    const yearsAgo = currentAcademicStart - startYear

    let yearsAgoString = `${yearsAgo} years ago`

    if (yearsAgo == 0) {
        yearsAgoString = `current`
    }

    if (yearsAgo == 1) {
        yearsAgoString = `1 year ago`
    }

    const formattedYear = `${startYear}/${endYear % 100}`

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Link
                    className="group bg-background-layer-1 p-2 text-center hover:bg-accent"
                    href={url}
                >
                    <p className="font-mono text-sm text-muted-foreground group-hover:text-accent-foreground group-focus:text-accent-foreground">
                        {yearsAgoString}
                    </p>
                    <p className="font-mono">{formattedYear}</p>
                </Link>
            </ContextMenuTrigger>
            <BasicContextMenu href={url} name={formattedYear} />
        </ContextMenu>
    )
}
