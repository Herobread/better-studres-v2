import NiceModal from "@ebay/nice-modal-react"
import { Button } from "@src/components/ui/button"
import { isSpecialDay } from "@src/features/contentEnhancers/emoji/modules"
import PremiumDialog from "@src/features/easterEgg/PremiumDialog"

export function PremiumMessage() {
    if (!isSpecialDay()) {
        return
    }
    const handleOpenDialog = () => {
        NiceModal.show(PremiumDialog)
    }

    return (
        <>
            <div className="grid grid-cols-[1fr_max-content] items-center gap-1 rounded-md border-2 border-solid border-border p-4">
                <div className="space-y-1">
                    <h2 className="text-lg font-bold">
                        Introducing Better Studres Premium!
                    </h2>
                    <ul className="list-inside list-disc">
                        <li>Delete files</li>
                        <li>Add files</li>
                        <li>AI Teammate™ </li>
                        <li>...and much more!</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                        Special Deal for April Fools’!
                    </p>
                </div>
                <Button
                    size={"sm"}
                    onClick={handleOpenDialog}
                    className="bg-gradient-to-tr from-purple-600 to-purple-900 font-bold text-white shadow-md transition-all hover:scale-125"
                >
                    UPGRADE
                </Button>
            </div>
        </>
    )
}
