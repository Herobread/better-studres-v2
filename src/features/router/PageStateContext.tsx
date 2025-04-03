import { PageData } from "@src/features/parser"
import { Dispatch, SetStateAction, createContext, useState } from "react"

export type TransitionData = {
    direction: "left" | "right" | "bottom" | "top"
}

type PageStateTypes = {
    transitionData: TransitionData | undefined
    setTransitionData: Dispatch<SetStateAction<TransitionData | undefined>>
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    pageData: PageData | undefined
    setPageData: Dispatch<SetStateAction<PageData | undefined>>
}

const pageStateFallback: PageStateTypes = {
    transitionData: undefined,
    setTransitionData: () => {
        throw new Error("setTransitionData not initialized")
    },
    isLoading: false,
    setIsLoading: () => {
        throw new Error("setIsLoading not initialized")
    },
    pageData: undefined,
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
    const [transitionData, setTransitionData] = useState<
        TransitionData | undefined
    >(undefined)

    return (
        <PageStateContext.Provider
            value={{
                transitionData,
                setTransitionData,
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
