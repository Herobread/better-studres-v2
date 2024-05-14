export default async function getUrlData(href: string) {
    const res = fetch(href).then((res) => {
        console.log(res.blob())
    })
}
