import NiceModal, { useModal } from "@ebay/nice-modal-react"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@src/components/ui/carousel"
import { Dialog, DialogContent, DialogTitle } from "@src/components/ui/dialog"
import React from "react"

export default NiceModal.create(() => {
    const modalHandler = useModal()
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    // modalHandler.hide()

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Dialog handler={modalHandler}>
            <DialogContent>
                <DialogTitle className="text-center">
                    Better Studres Premium
                </DialogTitle>
                <p className="text-center">
                    Available now just for{" "}
                    <span className="font-bold">£69.99!</span>
                </p>
                <div className="flex w-full justify-center">
                    <Carousel
                        className="w-full max-w-xs overflow-visible"
                        setApi={setApi}
                    >
                        <CarouselContent className="overflow-visible">
                            <PremiumContent
                                header="Delete and Add Files™"
                                description="Take control of your Studres experience. Delete unnecessary files and upload new ones with ease."
                            />
                            <PremiumContent
                                header="Hello Kitty Pet™"
                                description="Now with sudo privileges! Watch her rm -rf / all your files! So cute!"
                            />
                            <PremiumContent
                                header="AI Teammate™"
                                description="Can you just do my part? Thx :)’"
                            />
                            <PremiumContent
                                header="SkipMaster 3000™"
                                description="Automatically generates excuses for missing class and tracks your skip streaks: ‘5 skips in a row! Achievement unlocked!’."
                            />
                            <PremiumContent
                                header="isitdarkoutside.com Integration"
                                description="Tells you if it’s dark outside (because you haven’t seen sunlight in weeks)."
                            />
                            <PremiumContent
                                header="Bee Movie Overlay™"
                                description="Plays the Bee Movie script in a semi-transparent overlay over every page."
                            />
                            <PremiumContent
                                header="File Shuffler™"
                                description="Randomly renames and reorganizes your files every time you open Studres for peak productivity."
                            />
                        </CarouselContent>
                        <CarouselNext />
                        <CarouselPrevious />
                    </Carousel>
                </div>
                <div className="text-center text-muted-foreground">
                    {current}/7
                </div>
            </DialogContent>
        </Dialog>
    )
})

export function PremiumContent({
    description,
    header,
    emoji,
}: {
    header: string
    description: string
    emoji: string
}) {
    return (
        <CarouselItem>
            <div className="p-1">
                <div className="flex aspect-square flex-col justify-center gap-2 rounded-md bg-gradient-to-tr from-purple-400 to-purple-700 p-6 text-white shadow-lg">
                    <span className="text-3xl">{emoji}</span>
                    <h3 className="text-xl font-bold">{header}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </CarouselItem>
    )
}
