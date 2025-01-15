import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@src/components/ui/command"
import { DialogDescription, DialogTitle } from "@src/components/ui/dialog"
import {
    convertUrlSegmentsToUrl,
    extractUrlSegments,
} from "@src/features/files"
import { getSegmentType } from "@src/features/router/getSegmentType"
import useSmoothRouter from "@src/features/router/useSmoothRouter"
import { getAcademicYearEnd } from "@src/lib/utils"

function generateArchivedYears() {
    const STUDRES_ARCHIVE_YEAR_START = 2009
    const STUDRES_ARCHIVE_YEAR_END = getAcademicYearEnd()

    const result = []

    for (
        let current = STUDRES_ARCHIVE_YEAR_START;
        current < STUDRES_ARCHIVE_YEAR_END;
        current++
    ) {
        result.push(current + "_" + (current + 1))
    }

    return result.reverse()
}

export default NiceModal.create(() => {
    const { navigateToPage } = useSmoothRouter()
    const modalHandler = useModal()

    const archivedYears = generateArchivedYears()

    const handleSelection = (archiveYear: string) => {
        const currentUrl = window.location.toString()
        const currentUrlSegments = extractUrlSegments(currentUrl)

        if (getSegmentType(currentUrlSegments[0]) === "archive") {
            currentUrlSegments.splice(0, 1)
        }

        if (!archiveYear.includes(getAcademicYearEnd().toString())) {
            currentUrlSegments.unshift(archiveYear)
        }

        navigateToPage(convertUrlSegmentsToUrl(currentUrlSegments))
        modalHandler.hide()
    }

    return (
        <CommandDialog handler={modalHandler}>
            <Command>
                <VisuallyHidden>
                    <DialogTitle>
                        <DialogDescription>
                            Archive selection dialog
                        </DialogDescription>
                    </DialogTitle>
                </VisuallyHidden>
                <CommandInput placeholder="Search archive year..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {archivedYears.map((year) => {
                        return (
                            <CommandItem
                                onSelect={() => {
                                    handleSelection(year)
                                }}
                                key={year}
                                value={year}
                            >
                                {year}
                            </CommandItem>
                        )
                    })}
                </CommandList>
            </Command>
        </CommandDialog>
    )
})
