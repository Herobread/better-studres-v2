import { CONFIG_FALLBACK } from "@src/features/config/configFallback"
import { loadConfig } from "@src/features/config/loadConfig"
import { saveConfig } from "@src/features/config/saveConfig"
import { ConfigTypes } from "@src/types/configTypes"
import { useQuery } from "@tanstack/react-query"
import React, { createContext, useEffect, useState } from "react"
import { Storage, storage } from "webextension-polyfill"

export const ConfigContext = createContext<ConfigTypes>(CONFIG_FALLBACK)

interface ConfigContextProviderProps {
    children: React.ReactNode
}

export default function ConfigContextProvider({
    children,
}: ConfigContextProviderProps) {
    const { data: initialConfig } = useQuery({
        queryKey: ["config"],
        queryFn: loadConfig,
        initialData: CONFIG_FALLBACK,
    })

    const [config, setConfig] = useState<ConfigTypes>(initialConfig)

    useEffect(() => {
        if (initialConfig) {
            setConfig(initialConfig)
        }
    }, [initialConfig])

    useEffect(() => {
        const handleStorageChange = (
            changes: Record<string, Storage.StorageChange>
        ) => {
            if (changes.config) {
                const newConfig = changes.config.newValue
                setConfig(newConfig)
                saveConfig(newConfig)
            }
        }

        storage.onChanged.addListener(handleStorageChange)
        return () => {
            storage.onChanged.removeListener(handleStorageChange)
        }
    }, [])

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    )
}
