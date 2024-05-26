import { ChangesRecord } from "@src/content/versionControl"
import { ArrowRightIcon } from "lucide-react"
import { Fragment } from "react/jsx-runtime"
import ChangesList from "./ChangesList"

interface ChangesRecordCardProps {
    changeRecords: ChangesRecord[]
}

export default function ChangesRecordCard({
    changeRecords,
}: ChangesRecordCardProps) {
    return (
        <div className="col-span-full grid grid-cols-subgrid gap-2">
            {changeRecords.map((changeRecord) => {
                const { header, changes, timestamp, version } = changeRecord

                return (
                    <Fragment key={timestamp.getTime()}>
                        <span className="h-min rounded-lg bg-muted px-2 font-bold">
                            {version}
                        </span>
                        <div className="gap-1">
                            <p className="font-bold">{header}</p>
                            {changes && (
                                <div className="flex items-center gap-1">
                                    <ChangesList changes={changes.before} />
                                    {changes.after && (
                                        <>
                                            <ArrowRightIcon
                                                size={18}
                                                strokeWidth={1}
                                            />
                                            <ChangesList
                                                changes={changes.after}
                                            />
                                        </>
                                    )}
                                </div>
                            )}
                            <p className="text-muted-foreground">
                                Observed{" "}
                                {timestamp.toLocaleString("en-UK", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: false,
                                })}
                            </p>
                        </div>
                    </Fragment>
                )
            })}
        </div>
    )
}
