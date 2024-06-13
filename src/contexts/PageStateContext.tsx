import { PageData } from "@src/types/pageContentTypes";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface PageStateTypes {
	isLoading: boolean
	setIsLoading: Dispatch<SetStateAction<boolean>>
	pageData: PageData | undefined
	setPageData: Dispatch<SetStateAction<PageData | undefined>>
}

const pageStateFallback: PageStateTypes | undefined = {
	isLoading: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setIsLoading: () => { },
	pageData: undefined,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setPageData: () => { }
}

export const PageStateContext = createContext<PageStateTypes>(pageStateFallback)

interface PageStateContextProviderProps {
	children: React.ReactNode
}

export function PageStateContextProvider({ children }: PageStateContextProviderProps) {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [pageData, setPageData] = useState<PageData | undefined>(undefined)

	return <PageStateContext.Provider value={{
		isLoading,
		setIsLoading,
		pageData,
		setPageData
	}}>
		{children}
	</PageStateContext.Provider>
}