import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


interface ProvidersProps {
	children: React.ReactNode
}

const queryClient = new QueryClient()

export default function Providers({ children }: ProvidersProps) {
	return <>
		<QueryClientProvider client={queryClient} >
			{children}
		</QueryClientProvider >
	</>
}