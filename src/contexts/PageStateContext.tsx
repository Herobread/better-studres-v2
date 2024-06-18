import { PageData } from "@src/content/parsers/parser"
import { Dispatch, SetStateAction, createContext, useState } from "react"

interface PageStateTypes {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    pageData: PageData | undefined
    setPageData: Dispatch<SetStateAction<PageData | undefined>>
}

const pageStateFallback: PageStateTypes = {
    isLoading: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsLoading: () => {
        throw new Error("setIsLoading not initialized")
    },
    pageData: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setPageData: () => {
        throw new Error("setPageData not initialized")
    },
}

export const PageStateContext = createContext<PageStateTypes>(pageStateFallback)

interface PageStateContextProviderProps {
    children: React.ReactNode
}

export function PageStateContextProvider({
    children,
}: PageStateContextProviderProps) {
    const [isLoading, setIsLoading] = useState<boolean>(
        pageStateFallback.isLoading
    )
    const [pageData, setPageData] = useState<PageData | undefined>(undefined)

    return (
        <PageStateContext.Provider
            value={{
                isLoading,
                setIsLoading,
                pageData,
                setPageData,
            }}
        >
            {children}
        </PageStateContext.Provider>
    )
}
