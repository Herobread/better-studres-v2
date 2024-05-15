import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './studres-css-reset.css'
import './style.css'

interface ProvidersProps {
	children: React.ReactNode
}

const queryClient = new QueryClient()

export default function Providers({ children }: ProvidersProps) {
	return <>
		<div className="_tailwind_preflight_reset box-sizing-unset">
			<QueryClientProvider client={queryClient} >
				{children}
			</QueryClientProvider >
		</div>
	</>
}