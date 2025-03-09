import { Button } from "@src/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"

export function Toolbar({
    children,
    isMinimized,
    onToggleMinimized,
}: {
    children: React.ReactNode
    isMinimized: boolean
    onToggleMinimized: () => void
}) {
    return (
        <div className="_tailwind_preflight_reset fixed bottom-3 left-1/2 -translate-x-1/2 transform text-base text-foreground">
            <div
                data-minimized={isMinimized}
                className="group/minimized grid grid-cols-[1fr_auto] items-stretch gap-2 rounded-md bg-background p-3 shadow-lg transition-all 
                data-[minimized=true]/minimized:gap-0
                data-[minimized=true]/minimized:p-0
                "
            >
                <div className="grid grid-cols-[1fr] overflow-hidden transition-all 
                group-data-[minimized=true]/minimized:grid-cols-[0fr]
                group-data-[minimized=true]/minimized:opacity-0
                ">
                    <div className="flex min-w-0 gap-2 ">
                        {children}
                    </div>
                </div>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onToggleMinimized}
                    className="relative"
                >
                    <Minimize2 className="absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all group-data-[minimized=true]/minimized:scale-0" />
                    <Maximize2 className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all group-data-[minimized=true]/minimized:scale-100" />
                    <span className="sr-only">
                        {isMinimized ? "Maximize" : "Minimize"}
                    </span>
                </Button>
            </div>
        </div>
    )
}
