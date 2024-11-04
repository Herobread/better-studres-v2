import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
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
import useSmoothRouter from "@src/features/router/useSmoothRouter"

function generateArchivedYears() {
    const now = new Date()

    const STUDRES_ARCHIVE_YEAR_START = 2009
    const STUDRES_ARCHIVE_YEAR_END = now.getFullYear()

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

        currentUrlSegments.unshift(archiveYear)

        navigateToPage(convertUrlSegmentsToUrl(currentUrlSegments))
        modalHandler.hide()
    }

    return (
        <CommandDialog handler={modalHandler}>
            <VisuallyHidden>
                <DialogTitle>
                    <DialogDescription>Command dialog</DialogDescription>
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
        </CommandDialog>
    )
})
