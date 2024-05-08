export interface Image {
    src?: string
    alt?: string
}

export interface SortLinks {
    [name: string]: string
}

export interface FileLink {
    image?: Image
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
    virtualPath: string[]
}

export interface TrackedFileLinkRecord {
    fileLink: FileLink
    modified: Date
}

export interface TrackedFileLinkRecords {
    history: TrackedFileLinkRecord[]
    modified: Date
    current: FileLink
}

export interface PageData {
    title: string
    sortLinks: SortLinks
    fileLinks: FileLink[]
}

export interface QuickLink {
    id: number
    icon: string
    name: string
    href: string
}

export interface RawQuickLink {
    icon: string
    name: string
    href: string
}
