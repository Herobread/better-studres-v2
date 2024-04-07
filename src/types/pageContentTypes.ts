export interface Image {
    src?: string
    alt?: string
}

export interface SortLink {
    name: string
    href: string
}

export interface FileLink {
    image?: Image
    emoji?: string
    name: string
    lastModified: string
    size: string
    description: string
    href: string
}

export interface PageData {
    title: string
    sortLinks: SortLink[]
    fileLinks: FileLink[]
}
