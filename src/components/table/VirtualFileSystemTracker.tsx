import { saveFileLinks } from "@src/content/versionControl/virtualFileSystem";
import { FileLink } from "@src/types/pageContentTypes"
import { useEffect } from "react";

interface VirtualFileSystemTrackerProps {
	fileLinks: FileLink[]
}

export default function VirtualFileSystemTracker({ fileLinks }: VirtualFileSystemTrackerProps) {
	useEffect(() => {
		async function saveAllFileLinks() {
			await saveFileLinks(fileLinks)
		}
		saveAllFileLinks();
	}, [fileLinks]);

	return null
}