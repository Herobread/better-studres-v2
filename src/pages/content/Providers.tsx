import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@src/assets/styles/studres-css-reset.css'
import '@src/assets/styles/shadcn-ui.css'
import { CommandProvider } from '@src/components/command/CommandContext'
import ConfigContextProvider from '@src/contexts/ConfigContext'

interface ProvidersProps {
	children: React.ReactNode
}

const queryClient = new QueryClient()

export default function Providers({ children }: ProvidersProps) {
	return <div className="_tailwind_preflight_reset box-sizing-unset">
		<QueryClientProvider client={queryClient} >
			<CommandProvider>
				<ConfigContextProvider>
					{children}
				</ConfigContextProvider>
			</CommandProvider>
		</QueryClientProvider >
	</div>
}