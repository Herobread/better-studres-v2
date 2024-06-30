import { FileLink } from "@src/types/pageContentTypes";
import { trackFileLinks } from "../versionControl/track";

export function applySomething(fileLinks: FileLink[]) {
    trackFileLinks(fileLinks)
}