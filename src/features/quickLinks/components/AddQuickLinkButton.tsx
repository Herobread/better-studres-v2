import { generateQuickLinkInfo } from "@src/features/quickLinks/generateQuickLinkInfo"
import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../components/ui/popover"
import AddQuickLinkForm from "./AddQuickLinkForm"
import QuickLinkButton from "./QuickLinkButton"

export function AddQuickLinkButton() {
    const [isOpen, setIsOpen] = useState(false)

    const currentUrl = window.location.toString()
    const { href: currentQuickLinkHref, name: currentQuickLinkName } =
        generateQuickLinkInfo(currentUrl)

    const handleQuickLinksUpdated = async () => {
        setIsOpen(false)
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <QuickLinkButton icon="➕" content="Save" />
            </PopoverTrigger>
            <PopoverContent>
                <AddQuickLinkForm
                    href={currentQuickLinkHref}
                    name={currentQuickLinkName}
                    afterSubmit={handleQuickLinksUpdated}
                />
            </PopoverContent>
        </Popover>
    )
}
