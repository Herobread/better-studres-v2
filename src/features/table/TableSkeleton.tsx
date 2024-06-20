import { Skeleton } from "../../components/ui/skeleton"

export default function TableSkeleton() {
    return (
        <div className="grid grid-cols-[50px_auto_4fr_max-content_max-content_3fr] gap-3">
            <div className="col-span-full grid grid-cols-subgrid items-center gap-3 p-3">
                <span className="col-span-2"></span>{" "}
                <Skeleton className="h-[21.6px] w-[64.56px] rounded-xl py-3" />
                <Skeleton className="h-[21.6px] w-[47.99px] rounded-xl py-3" />
                <div></div>
                <Skeleton className="h-[21.6px] w-[73.71px] justify-self-end rounded-xl py-3" />
            </div>
            <Skeleton className="col-span-full h-[45.6px] w-full rounded-xl" />
        </div>
    )
}
