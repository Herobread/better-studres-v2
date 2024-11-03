export type DateDisplayOptions = "full" | "relative"
export type FileIconsDisplayOptions = "emoji" | "pictures"

export interface ConfigTypes {
    date: DateDisplayOptions
    fileIcons: FileIconsDisplayOptions
    imagePreviewAsIcon: boolean
    imagePreviewOnHover: boolean
    showQuickLinks: boolean
    showCommandButton: boolean
    username?: string
    downloadPathPreference?: string
}
