import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react"

type FileKeysList = string[]

type DownloadInfoTypes = {
    currentlyDownloadingFileKeys: FileKeysList
    setCurrentlyDownloadingFileKeys: Dispatch<SetStateAction<FileKeysList>>
    addFileKeyToDownloadingList: (fileKey: string) => void
    removeFileKeyFromDownloadingList: (fileKey: string) => void
    isKeyDownloading: (fileKey: string) => boolean
}

const DownloadInfoContext = createContext<DownloadInfoTypes | undefined>(
    undefined
)

export const DownloadInfoProvider = ({ children }: { children: ReactNode }) => {
    const [currentlyDownloadingFileKeys, setCurrentlyDownloadingFileKeys] =
        useState<FileKeysList>([])

    const addFileKeyToDownloadingList = (fileKey: string) => {
        setCurrentlyDownloadingFileKeys((fileKeys) => [...fileKeys, fileKey])
    }

    const removeFileKeyFromDownloadingList = (fileKey: string) => {
        setCurrentlyDownloadingFileKeys((fileKeys) =>
            fileKeys.filter((key) => key !== fileKey)
        )
    }

    const isKeyDownloading = (fileKey: string) => {
        return currentlyDownloadingFileKeys.some(
            (fileKey_) => fileKey_ === fileKey
        )
    }

    return (
        <DownloadInfoContext.Provider
            value={{
                currentlyDownloadingFileKeys,
                setCurrentlyDownloadingFileKeys,
                addFileKeyToDownloadingList,
                removeFileKeyFromDownloadingList,
                isKeyDownloading,
            }}
        >
            {children}
        </DownloadInfoContext.Provider>
    )
}

export const useDownloadInfo = () => {
    const context = useContext(DownloadInfoContext)

    if (!context) {
        throw new Error(
            "useDownloadInfo must be used within a DownloadInfoProvider"
        )
    }

    return context
}
