import { useQuery } from "@tanstack/react-query"
import "@src/assets/styles/css-reset.css"
import {
    ACTIVE_TAB_QUERY_KEY,
    getActiveTab,
} from "@src/features/extensionToggle/getActiveTab"
import { BASE_URL } from "@src/features/versionControl"
import PopupFallback from "./PopupFallBack"
import PopupActive from "./PopupActive"

export default function Popup() {
    const { data: activeTab } = useQuery({
        queryKey: [ACTIVE_TAB_QUERY_KEY],
        queryFn: getActiveTab,
    })

    const url = activeTab?.url

    return <>{url?.includes(BASE_URL) ? <PopupActive /> : <PopupFallback />}</>
}
