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
    lastModified: string
    lastModifiedRelative: string
    space?: {
        size: number
        units: string
    }
    description?: string
    href: string
}

export interface PageData {
    title: string
    sortLinks: SortLinks
    fileLinks: FileLink[]
}
