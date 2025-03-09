import { Button } from "@src/components/ui/button"
import { Minimize2, PencilRulerIcon } from "lucide-react"

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
        <div
            id="toolbar"
            tabIndex={-1}
            aria-label="Toolbar"
            aria-expanded={!isMinimized}
            aria-live="polite"
            className="_tailwind_preflight_reset fixed bottom-3 left-1/2 -translate-x-1/2 transform text-base text-foreground"
        >
            <div
                data-minimized={isMinimized}
                className="group/minimized grid grid-cols-[1fr_auto] items-stretch gap-2 rounded-md bg-background p-3 shadow-lg transition-all 
                data-[minimized=true]/minimized:gap-0
                data-[minimized=true]/minimized:p-0
                data-[minimized=true]/minimized:opacity-50
                data-[minimized=true]/minimized:hover:opacity-100"
            >
                <div
                    className={`grid grid-cols-[1fr] transition-all 
                    group-data-[minimized=true]/minimized:grid-cols-[0fr]
                    group-data-[minimized=true]/minimized:opacity-0
                    ${isMinimized ? "pointer-events-none select-none" : ""}`}
                >
                    <div className="flex min-w-0 gap-2">{children}</div>
                </div>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onToggleMinimized}
                    aria-controls="toolbar"
                    aria-expanded={!isMinimized}
                    className="relative"
                >
                    <Minimize2 className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 group-data-[minimized=true]/minimized:-rotate-90 group-data-[minimized=true]/minimized:scale-50 group-data-[minimized=true]/minimized:opacity-0" />
                    <PencilRulerIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 group-data-[minimized=true]/minimized:rotate-0 group-data-[minimized=true]/minimized:scale-100" />
                    <span className="sr-only">
                        {isMinimized ? "Maximize Toolbar" : "Minimize Toolbar"}
                    </span>
                </Button>
            </div>
        </div>
    )
}
