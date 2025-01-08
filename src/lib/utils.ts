import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names using clsx and tailwind-merge.
 * @param {...ClassValue[]} inputs - The class names to merge.
 * @returns {string} The merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

/**
 * Initiates a file download.
 * @param href - The URL of the file to download.
 * @param filename - The name to save the file as.
 */
export function downloadFile(href: string, filename: string): void {
    const link = document.createElement("a")
    link.href = href
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

/**
 * same as string.endsWith but for array
 *
 * @param str
 * @param ends
 */
export function endsWith(str: string, ends: string[]) {
    return ends.some((end) => str.endsWith(end))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepEqual(obj1: any, obj2: any) {
    if (obj1 === obj2) {
        return true
    }
    if (
        typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 == null ||
        obj2 == null
    ) {
        return false
    }
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) {
        return false
    }
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false
        }
    }
    return true
}

export function getOs() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userAgentData = (navigator as any).userAgentData
    const userAgent = navigator.userAgent.toLowerCase()

    if (userAgentData && userAgentData.platform) {
        if (userAgentData.platform.includes("Win")) return "windows"
        if (userAgentData.platform.includes("Mac")) return "mac"
        if (userAgentData.platform.includes("Linux")) return "linux"
    } else {
        // Fallback using userAgent
        if (userAgent.includes("win")) return "windows"
        if (userAgent.includes("mac")) return "mac"
        if (userAgent.includes("linux")) return "linux"
    }

    return "Unknown OS"
}

export const isSmallImage = (src: string) => {
    const img = new Image()
    img.src = src
    return img.width <= 32 && img.height <= 32
}

export function getAcademicYearEnd(currentDate = new Date()): number {
    return currentDate.getMonth() >= 8
        ? currentDate.getFullYear() + 1
        : currentDate.getFullYear()
}

export function getAcademicYearStart(currentDate = new Date()): number {
    return getAcademicYearEnd(currentDate) - 1
}
