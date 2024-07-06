import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { Toggle } from "@src/components/ui/toggle"
import { Tooltip, TooltipContent } from "@src/components/ui/tooltip"
import { useQuery } from "@tanstack/react-query"
import { SparklesIcon } from "lucide-react"
import { useEffect, useState } from "react"
import {
    IS_URL_BLACK_LISTED_QUERY_KEY,
    checkIsUrlBlackListed,
    toggleBlackListForUrl,
} from "./blacklist"
import { ACTIVE_TAB_QUERY_KEY, getActiveTab } from "./getActiveTab"
import { reload } from "./reload"

export default function BlacklistToggle() {
    const [isUrlBlackListed, setIsUrlBlackListed] = useState(false)

    const { data: activeTab, isLoading } = useQuery({
        queryKey: [ACTIVE_TAB_QUERY_KEY],
        queryFn: getActiveTab,
    })

    const { data: isUrlBlackListed_storageData } = useQuery({
        queryKey: [IS_URL_BLACK_LISTED_QUERY_KEY],
        queryFn: async () => {
            return checkIsUrlBlackListed(url)
        },
        enabled: !!activeTab?.url,
    })

    useEffect(() => {
        if (isUrlBlackListed_storageData) {
            setIsUrlBlackListed(isUrlBlackListed_storageData)
        }
    }, [isUrlBlackListed_storageData])

    if (isLoading || !activeTab?.url) {
        return (
            <Toggle disabled>
                <SparklesIcon />
            </Toggle>
        )
    }

    const { url } = activeTab

    const handleChange = async () => {
        await toggleBlackListForUrl(url)
        setIsUrlBlackListed(!isUrlBlackListed)

        reload()
    }

    return (
        <Tooltip>
            <TooltipTrigger>
                <Toggle
                    onPressedChange={handleChange}
                    pressed={!isUrlBlackListed}
                >
                    <SparklesIcon />
                </Toggle>
            </TooltipTrigger>
            <TooltipContent>
                {isUrlBlackListed
                    ? "Enhancements are off for this page. Enable?"
                    : "Enhancements are on for this page. Disable?"}
            </TooltipContent>
        </Tooltip>
    )
}
