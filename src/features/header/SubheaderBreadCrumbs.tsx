import { Fragment } from "react"
import { extractUrlSegments, BASE_URL } from "@src/features/versionControl"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@src/components/ui/breadcrumb"

interface BreadcrumbType {
    name: string
    href: string
}

export default function SubheaderBreadcrumbs() {
    const currentUrl = location.href.toString()

    const urlSegments = extractUrlSegments(currentUrl)

    const links: BreadcrumbType[] = []
    const currentBreadcrumbs: string[] = []

    for (let i = 0; i < urlSegments.length; i++) {
        currentBreadcrumbs.push(urlSegments[i])

        links.push({
            href: BASE_URL + currentBreadcrumbs.join("/") + "/",
            name: decodeURI(urlSegments[i]),
        })
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={BASE_URL}>Root</BreadcrumbLink>
                </BreadcrumbItem>
                {links.map((link) => {
                    const { href, name } = link

                    return (
                        <Fragment key={href}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={href}>
                                    {name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
