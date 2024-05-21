import generateVirtualPath from "@src/content/versionControl/generateVirtualPath"
import { BASE_URL } from "@src/content/versionControl/virtualFileSystem"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Fragment } from "react"

interface Breadcrumb {
	name: string
	href: string
}

export default function SubheaderBreadcrumbs() {
	const currentUrl = location.href.toString()

	const virtualPath = generateVirtualPath(currentUrl)

	const links: Breadcrumb[] = []
	const currentBreadcrumbs: string[] = []

	for (let i = 0; i < virtualPath.length; i++) {
		currentBreadcrumbs.push(virtualPath[i])

		links.push({
			href: BASE_URL + currentBreadcrumbs.join('/'),
			name: virtualPath[i]
		})
	}

	return <Breadcrumb>
		<BreadcrumbList>
			<BreadcrumbItem >
				<BreadcrumbLink href={BASE_URL}>Root</BreadcrumbLink>
			</BreadcrumbItem>
			{
				links.map(link => {
					const { href, name } = link

					return <Fragment key={href}>
						<BreadcrumbSeparator />
						<BreadcrumbItem >
							<BreadcrumbLink href={href}>{name}</BreadcrumbLink>
						</BreadcrumbItem>
					</Fragment >
				})
			}
		</BreadcrumbList>
	</Breadcrumb>
}