import { useQuery } from "@tanstack/react-query"
import "@src/assets/styles/css-reset.css"
import {
    ACTIVE_TAB_QUERY_KEY,
    getActiveTab,
} from "@src/features/extensionToggle/getActiveTab"
import { BASE_URL } from "@src/features/files"
import PopupActive from "./PopupActive"
import PopupFallback from "./PopupFallback"

export default function Popup() {
    const { data: activeTab } = useQuery({
        queryKey: [ACTIVE_TAB_QUERY_KEY],
        queryFn: getActiveTab,
    })

    const url = activeTab?.url

    return (
        <div id="__better_studres_theme_root">
            {url?.includes(BASE_URL) ? <PopupActive /> : <PopupFallback />}
        </div>
    )
}
