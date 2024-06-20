import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@src/assets/styles/studres-css-reset.css"
import "@src/assets/styles/shadcn-ui.css"
import { CommandProvider } from "@src/components/command/CommandContext"
import { TooltipProvider } from "@src/components/ui/tooltip"
import { SmoothRouterListener } from "@src/features/router/SmoothRouterListener"
import { PreferredTheme, ThemeProvider } from "@src/features/theme"
import { Toaster } from "@src/components/ui/toaster"
import { PageStateContextProvider } from "@src/features/router/PageStateContext"
import ConfigContextProvider from "@src/features/config/ConfigContext"

interface ProvidersProps {
    children: React.ReactNode
    overrideTheme?: PreferredTheme
}

const queryClient = new QueryClient()

export default function Providers({ children, overrideTheme }: ProvidersProps) {
    overrideTheme ??= "system"

    return (
        <div className="box-sizing-unset _tailwind_preflight_reset">
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    defaultTheme={"system"}
                    overrideTheme={overrideTheme}
                    storageKey="vite-ui-theme"
                >
                    <PageStateContextProvider>
                        <SmoothRouterListener />
                        <TooltipProvider>
                            <CommandProvider>
                                <ConfigContextProvider>
                                    {children}
                                    <Toaster />
                                </ConfigContextProvider>
                            </CommandProvider>
                        </TooltipProvider>
                    </PageStateContextProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </div>
    )
}
