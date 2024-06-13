import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton() {
	return <div className="grid grid-cols-[50px_auto_4fr_max-content_max-content_3fr] gap-3">
		<div className="col-span-full grid grid-cols-subgrid items-center gap-3 p-3">
			<span className="col-span-2"></span>{" "}
			<Skeleton className="w-[64.56px] h-[21.6px] py-3 rounded-xl" />
			<Skeleton className="w-[47.99px] h-[21.6px] py-3 rounded-xl" />
			<div></div>
			<Skeleton className="w-[73.71px] h-[21.6px] py-3 rounded-xl justify-self-end" />
		</div>
		<Skeleton className="w-full h-[45.6px] rounded-xl col-span-full" />
	</div>
}