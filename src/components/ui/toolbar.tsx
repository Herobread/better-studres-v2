export function Toolbar({ children }: { children: React.ReactNode }) {
    return (
        <div className="_tailwind_preflight_reset fixed bottom-3 left-1/2 -translate-x-1/2 transform text-base text-foreground">
            <div className="flex min-h-full items-stretch gap-2 rounded-md bg-background p-3 shadow-lg ">
                {children}
            </div>
        </div>
    )
}
