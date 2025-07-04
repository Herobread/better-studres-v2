import NiceModal from "@ebay/nice-modal-react"
import "@src/assets/styles/shadcn-ui.css"
import { Toaster } from "@src/components/ui/toaster"
import { TooltipProvider } from "@src/components/ui/tooltip"
import ConfigContextProvider from "@src/features/config/ConfigContext"
import { DownloadInfoProvider } from "@src/features/fileDownload/DownloadInfoContext"
import { PageStateContextProvider } from "@src/features/router/PageStateContext"
import { SmoothRouterListener } from "@src/features/router/SmoothRouterListener"
import { PreferredTheme, ThemeProvider } from "@src/features/theme"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HelmetProvider } from "react-helmet-async"

interface ProvidersProps {
    children: React.ReactNode
    overrideTheme?: PreferredTheme
}

const queryClient = new QueryClient()

export default function Providers({ children, overrideTheme }: ProvidersProps) {
    overrideTheme ??= "system"

    return (
        <div className="box-sizing-unset _tailwind_preflight_reset">
            <div
                id="focusResetter"
                tabIndex={-1}
                className="absolute left-[-9999px] top-[-9999px]"
            >
                .
            </div>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    defaultTheme={"system"}
                    overrideTheme={overrideTheme}
                    storageKey="vite-ui-theme"
                >
                    <PageStateContextProvider>
                        <HelmetProvider>
                            <SmoothRouterListener />
                            <NiceModal.Provider>
                                <TooltipProvider delayDuration={0}>
                                    <ConfigContextProvider>
                                        <DownloadInfoProvider>
                                            {children}
                                        </DownloadInfoProvider>
                                        <Toaster />
                                    </ConfigContextProvider>
                                </TooltipProvider>
                            </NiceModal.Provider>
                        </HelmetProvider>
                    </PageStateContextProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </div>
    )
}
