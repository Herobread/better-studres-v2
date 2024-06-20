import { UrlSegments } from "@src/features/versionControl"

export interface Image {
    src?: string
    alt?: string
}

export interface SortLinks {
    [name: string]: string
}

export interface FileLink {
    image?: Image
    isImage: boolean
    isFolder: boolean
    emoji?: string
    name: string
    extension?: string
    lastModifiedDate: Date
    lastModified: string
    lastModifiedRelative: string
    space?: {
        size: number
        units: string
    }
    description?: string
    href: string
    urlSegments: UrlSegments
}
