import { Separator } from "../ui/separator"

interface FileCardProps {
	size: string
	unit: string
}

export default function FileCard({ size, unit }: FileCardProps) {
	return <>
		<div>
			<div>📕</div>
			<div>pdf</div>
		</div>
		<Separator orientation="vertical" />
		<div>
			<div>CS1006_P2_GameOfLife</div>
			<div>Description</div>
		</div>
		<div>{size}</div>
		<div>{unit}</div>
		<div>2 month ago</div>
	</>
}