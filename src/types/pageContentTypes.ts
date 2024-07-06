export interface Image {
    src?: string
    alt?: string
}

export interface SortLinks {
    [name: string]: string
}

// export interface FileLink {
//     image?: Image
//     isImage: boolean
//     isFolder: boolean
//     emoji?: string
//     name: string
//     fullName: string
//     extension?: string
//     lastModifiedDate: Date
//     lastModified: string
//     lastModifiedRelative: string
//     space?: {
//         size: number
//         units: string
//     }
//     description?: string
//     href: string
//     hrefAttributeValue: string
//     urlSegments: UrlSegments
// }
