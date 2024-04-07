interface TitleProps {
    children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
    return <h1 className="font-bold text-2xl">{children}</h1>
}
