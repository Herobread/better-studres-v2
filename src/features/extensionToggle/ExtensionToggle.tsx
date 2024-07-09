import { Toggle } from "@src/components/ui/toggle"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@src/components/ui/tooltip"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { PowerCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { getExtensionState, setExtensionState } from "./extensionState"
import { reload } from "./reload"

const EXTENSION_STATE_QUERY_KEY = "extensionState"

export default function ExtensionToggle() {
    const queryClient = useQueryClient()
    const { data: extensionState, isLoading } = useQuery({
        queryKey: [EXTENSION_STATE_QUERY_KEY],
        queryFn: getExtensionState,
    })

    const [localExtensionState, setLocalExtensionState] =
        useState(extensionState)

    useEffect(() => {
        if (extensionState !== undefined) {
            setLocalExtensionState(extensionState)
        }
    }, [extensionState])

    const handleClick = async () => {
        const newState = !localExtensionState
        setLocalExtensionState(newState)
        await setExtensionState(newState)
        queryClient.invalidateQueries({
            queryKey: [EXTENSION_STATE_QUERY_KEY],
        })

        reload()
    }

    if (isLoading) {
        return (
            <Toggle size={"sm"} disabled>
                <PowerCircleIcon />
            </Toggle>
        )
    }

    return (
        <Tooltip>
            <TooltipTrigger>
                <Toggle
                    size={"sm"}
                    pressed={localExtensionState}
                    onPressedChange={handleClick}
                >
                    <PowerCircleIcon />
                </Toggle>
            </TooltipTrigger>
            <TooltipContent>
                {localExtensionState
                    ? "Extension is enabled"
                    : "Extension is disabled"}
            </TooltipContent>
        </Tooltip>
    )
}
