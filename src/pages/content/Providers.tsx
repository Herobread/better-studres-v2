import NiceModal from "@ebay/nice-modal-react"
import "@src/assets/styles/shadcn-ui.css"
import { Toaster } from "@src/components/ui/toaster"
import { TooltipProvider } from "@src/components/ui/tooltip"
import { CommandProvider } from "@src/features/command/CommandContext"
import ConfigContextProvider from "@src/features/config/ConfigContext"
import { PageStateContextProvider } from "@src/features/router/PageStateContext"
import { SmoothRouterListener } from "@src/features/router/SmoothRouterListener"
import { PreferredTheme, ThemeProvider } from "@src/features/theme"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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
                        <NiceModal.Provider>
                            <TooltipProvider delayDuration={0}>
                                <CommandProvider>
                                    <ConfigContextProvider>
                                        {children}
                                        <Toaster />
                                    </ConfigContextProvider>
                                </CommandProvider>
                            </TooltipProvider>
                        </NiceModal.Provider>
                    </PageStateContextProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </div>
    )
}
