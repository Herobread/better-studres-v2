import { Button } from "@src/components/ui/button"
import { EllipsisIcon, Minimize2 } from "lucide-react"

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
                className={`flex min-h-full items-stretch gap-2 rounded-md bg-background p-3 shadow-lg transition-all duration-300`}
            >
                {!isMinimized && children}
                <Button size="icon" variant="ghost" onClick={onToggleMinimized}>
                    {isMinimized ? <EllipsisIcon /> : <Minimize2 />}
                </Button>
            </div>
        </div>
    )
}
