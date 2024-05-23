interface TitleProps {
    children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
    return <h1 className="text-3xl font-bold">{children}</h1>
}
