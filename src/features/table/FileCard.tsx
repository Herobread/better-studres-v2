import { FullFileLink } from "../parser"

export default function FileCard({ fileLink }: { fileLink: FullFileLink }) {
    return <>{JSON.stringify(fileLink)}</>
    // const { isImage } = fileLink

    // const { imagePreviewOnHover } = useContext(ConfigContext)

    // if (isImage && imagePreviewOnHover) {
    //     return <ImageCard fileLink={fileLink} {...props} />
    // }

    // return <DefaultFileCard fileLink={fileLink} {...props} />
}
