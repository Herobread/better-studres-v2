import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@src/assets/styles/studres-css-reset.css"
import "@src/assets/styles/shadcn-ui.css"
import { CommandProvider } from "@src/components/command/CommandContext"
import ConfigContextProvider from "@src/contexts/ConfigContext"
import { TooltipProvider } from "@src/components/ui/tooltip"

interface ProvidersProps {
    children: React.ReactNode
}

const queryClient = new QueryClient()

export default function Providers({ children }: ProvidersProps) {
    return (
        <div className="box-sizing-unset _tailwind_preflight_reset">
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <CommandProvider>
                        <ConfigContextProvider>
                            {children}
                        </ConfigContextProvider>
                    </CommandProvider>
                </TooltipProvider>
            </QueryClientProvider>
        </div>
    )
}
