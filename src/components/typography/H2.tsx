interface H2Props {
    children: React.ReactNode
}

export default function H2({ children }: H2Props) {
    return <h2 className="text-xl font-bold">{children}</h2>
}
