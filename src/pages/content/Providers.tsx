import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@src/assets/styles/studres-css-reset.css"
import "@src/assets/styles/shadcn-ui.css"
import { CommandProvider } from "@src/components/command/CommandContext"
import ConfigContextProvider from "@src/contexts/ConfigContext"
import { TooltipProvider } from "@src/components/ui/tooltip"
import { PageStateContextProvider } from "@src/contexts/PageStateContext"
import { SmoothRouterListener } from "@src/components/router/SmoothRouterListener"
import { ThemeProvider } from "@src/contexts/ThemeContext"

interface ProvidersProps {
    children: React.ReactNode
}

const queryClient = new QueryClient()

export default function Providers({ children }: ProvidersProps) {
    return (
        <div className="box-sizing-unset _tailwind_preflight_reset min-h-screen bg-background py-2 text-foreground">
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                    <PageStateContextProvider>
                        <SmoothRouterListener />
                        <TooltipProvider>
                            <CommandProvider>
                                <ConfigContextProvider>
                                    {children}
                                </ConfigContextProvider>
                            </CommandProvider>
                        </TooltipProvider>
                    </PageStateContextProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </div>
    )
}
