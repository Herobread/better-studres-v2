import { FileLink, SortLinks } from "@src/types/pageContentTypes"
import { useEffect, useState } from "react"
import { Tag } from "../files/tags/storage"
import FileCard from "./FileCard"
import TableHeader from "./TableHeader"
import TableSkeleton from "./TableSkeleton"
import { ManageTagsDialog } from "./dialogs/tags/ManageTagsDialog"
import { ViewTaggedFilesDialog } from "./dialogs/tags/ViewTaggedFilesDialog"

interface TableProps {
    fileLinks: FileLink[]
    sortLinks: SortLinks
    isLoading: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Table({ fileLinks, sortLinks, isLoading }: TableProps) {
    const [state, setState] = useState<"open" | "closed">("closed")

    const [isManageTagsMenuOpen, setIsManageTagsDialogOpen] = useState(false)
    const [isViewTaggedFilesDialogOpen, setIsViewTaggedFilesDialogOpen] =
        useState(false)

    const [activeTag, setActiveTag] = useState<Tag>({ id: 0, name: "tag" })

    useEffect(() => {
        if (!isLoading) {
            setState("open")
        } else {
            setState("closed")
        }
    }, [isLoading])

    return (
        <>
            {isLoading ? (
                <TableSkeleton />
            ) : (
                <div
                    data-state={state}
                    className="grid grid-cols-[50px_auto_4fr_max-content_max-content_3fr] gap-3 
          transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
          "
                >
                    <>
                        <TableHeader sortLinks={sortLinks} />
                        {fileLinks.map((fileLink) => {
                            return (
                                <FileCard
                                    setActiveTag={setActiveTag}
                                    isViewTaggedFilesDialogOpen={
                                        isViewTaggedFilesDialogOpen
                                    }
                                    setIsViewTaggedFilesDialogOpen={
                                        setIsViewTaggedFilesDialogOpen
                                    }
                                    isManageTagsMenuOpen={isManageTagsMenuOpen}
                                    setIsManageTagsMenuOpen={
                                        setIsManageTagsDialogOpen
                                    }
                                    fileLink={fileLink}
                                    key={fileLink.href}
                                />
                            )
                        })}
                        <ManageTagsDialog
                            onOpenChange={setIsManageTagsDialogOpen}
                            open={isManageTagsMenuOpen}
                        />
                        <ViewTaggedFilesDialog
                            setIsOpen={setIsViewTaggedFilesDialogOpen}
                            open={isViewTaggedFilesDialogOpen}
                            tag={activeTag}
                        />
                    </>
                </div>
            )}
        </>
    )
}
