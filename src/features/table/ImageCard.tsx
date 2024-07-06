// import {
//     HoverCard,
//     HoverCardContent,
//     HoverCardTrigger,
// } from "../../components/ui/hover-card"
// import DefaultFileCard, { DefaultFileCardProps } from "./DefaultFileCard"

// export function ImageCard({ fileLink, ...props }: DefaultFileCardProps) {
//     const { href, name, extension } = fileLink

//     return (
//         <HoverCard>
//             <HoverCardTrigger asChild>
//                 <DefaultFileCard fileLink={fileLink} {...props} />
//             </HoverCardTrigger>
//             <HoverCardContent className="w-full max-w-96">
//                 <img src={href} alt={name} className="" />
//                 <p className="text-center">{name + "." + extension}</p>
//             </HoverCardContent>
//         </HoverCard>
//     )
// }
